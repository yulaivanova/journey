'use strict';
(function () {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 13;
  var navMain = document.querySelector('.site-nav');
  var navToggle = document.querySelector('.site-nav__toggle');
  var popupOverlay = document.querySelector('.popup');
  var popup = document.querySelector('.popup__inner');
  var popupForm = document.querySelector('.popup__form');
  var popupToggle = document.querySelector('.popup__toggle');
  var offer = document.querySelector('.offer');
  var toursList = document.querySelector('.tabs');
  var openBtn = document.querySelector('.button');
  var form = document.querySelector('.form');
  var toursLink = document.querySelectorAll('.tours__link');
  var tabNav = document.querySelectorAll('.tabs-nav__item');
  var tabContent = document.querySelectorAll('.tabs__item');
  var main = document.querySelector('main');
  var successMessageTemplate = document
      .querySelector('#success')
      .content.querySelector('.popup--success');
  var successMessage = null;
  var tabName;
  var tabLink;

  navMain.classList.remove('site-nav--nojs');
  navMain.classList.remove('site-nav--opened');
  navMain.classList.add('site-nav--closed');

  var onToursLinkClick = function () {
    toursLink.forEach(item => {
      item.addEventListener('click', selectLink);
    });

    function selectLink() {
      tabLink = this.getAttribute('data-tab-name');
      selectTab(tabLink);
    };

    function selectTab(tabLink) {
      tabContent.forEach(item => {
        item.classList.contains(tabLink) ? item.classList.add('tabs__item--is-active') : item.classList.remove('tabs__item--is-active');
      });
      tabNav.forEach(item => {
        item.dataset.tabName === tabLink ? item.classList.add('tabs-nav__item--is-active') : item.classList.remove('tabs-nav__item--is-active');
      });
    }
  };

  var onTabsClick = function () {
    tabNav.forEach (item => {
      item.addEventListener('click', selectTabNav);
      item.addEventListener('keydown', function (evt) {
        tabName = this.getAttribute('data-tab-name');
        if (evt.keyCode === ENTER_KEY) selectTabNavOnEnter(tabName);
      });
    });

    function selectTabNavOnEnter () {
      tabNav.forEach(item => {
        item.dataset.tabName === tabName ? item.classList.add('tabs-nav__item--is-active') : item.classList.remove('tabs-nav__item--is-active');
      });
      selectTabContent(tabName);
    };

    function selectTabNav () {
      tabNav.forEach(item => {
        item.classList.remove('tabs-nav__item--is-active');
      });
      this.classList.add('tabs-nav__item--is-active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent (tabName) {
      tabContent.forEach(item => {
        item.classList.contains(tabName) ? item.classList.add('tabs__item--is-active') : item.classList.remove('tabs__item--is-active');
      })
    }
  };

  var closePopup = function (event) {
    popupOverlay.classList.remove('popup--opened');
    popup.classList.remove('popup__inner--opened');
  };

  var openPopup = function () {
    popupOverlay.classList.add('popup--opened');
    popup.classList.add('popup__inner--opened');

    var fieldsetInputPhone = popupForm.querySelector('.fieldset__input--phone');
    fieldsetInputPhone.focus();
  };

  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  var onBtnClick = function (event) {
    var target = event.target;
    if (target.classList.contains('button')) {
      openPopup();
      document.addEventListener('keydown', onEscPress);
    }
  };

  var onOverlayClick = function (event) {
    var target = event.target;
    if (target.classList.contains('popup--opened')) {
      closePopup();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var showSuccessMessage = function () {
    successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);
    document.addEventListener('keydown', onMessagePress);
    document.addEventListener('click', onMessageClick);
  };

  var closeMessage = function () {
    if (successMessage) {
      successMessage.remove();
    }
    document.removeEventListener('keydown', onMessagePress);
    document.removeEventListener('click', onMessageClick);
  };

  var onMessageClick = function (event) {
    var target = event.target;
    if (target.classList.contains('popup--opened') || target.classList.contains('popup__toggle')) {
      closeMessage();
    }
  };

  var onMessagePress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeMessage();
    }
  };

  navToggle.addEventListener('click', function () {
    if (navMain.classList.contains('site-nav--closed')) {
      navMain.classList.remove('site-nav--closed');
      navMain.classList.add('site-nav--opened');
    } else {
      navMain.classList.add('site-nav--closed');
      navMain.classList.remove('site-nav--opened');
    }
  });

  popupToggle.addEventListener('click', function () {
    closePopup();
    document.removeEventListener('keydown', onEscPress);
  });

  offer.addEventListener('click', onBtnClick);
  toursList.addEventListener('click', onBtnClick);
  popupOverlay.addEventListener('click', onOverlayClick);

  popupForm.addEventListener('submit', function (evt) {
    showSuccessMessage();
    popupForm.reset();
    closePopup();
    evt.preventDefault();
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    form.reset();
    showSuccessMessage();
  });

  onTabsClick();
  onToursLinkClick();

}) ();
