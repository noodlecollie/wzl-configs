var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/* exported Saga */

let Saga = (() => {
    'use strict';

    let _getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    let _fitVids = () => {
        const players = [
            'iframe[src*="youtube.com"]',
            'iframe[src*="soundcloud.com"]',
            'iframe[src*="codepen.com"]',
            'iframe[src*="vimeo.com"]'
        ];

        let videos = document.querySelectorAll(players.join(','));

        if (videos.length) {

            for (let i = 0; i < videos.length; i += 1) {

                let video = videos[i];
                let width = video.getAttribute('width');
                let height = video.getAttribute('height');
                let aspectRatio = height / width;
                let parentDiv = video.parentNode;

                parentDiv.classList.add('responsive-video');
                parentDiv.style.paddingBottom = aspectRatio * 100 + '%';

                video.removeAttribute('height');
                video.removeAttribute('width');
            }
        }
    };

    let _gallery = () => {
        const images = document.querySelectorAll('.kg-gallery-image img');
        images.forEach((image) => {
            let container = image.closest('.kg-gallery-image');
            let width = image.attributes.width.value;
            let height = image.attributes.height.value;
            let ratio = width / height;
            container.style.flex = ratio + ' 1 0%';
        });
    };

    let _subscribeFeature = () => {
        // Give the parameter a variable name
        const body = document.querySelector('body');
        const subscribeCloseButton = document.querySelector('.subscribe-close-button');
        const subscribeSuccessMessage = document.querySelector('.subscribe-success-message');
        const subscribeModal = document.querySelector('.subscribe-modal');
        const subscribeModalClose = document.querySelectorAll('.subscribe-modal__close');
        const subscribeInputEmail = document.querySelector('.subscribe-form__input.-email');
        const subscribeButtons = document.querySelectorAll('a[href="#subscribe"]');
        const notSubscribeModal = document.querySelectorAll('body > *:not(.subscribe-modal)');

        let _oldFocusElement = undefined;

        const _showNotSubscribeModal = () => {
            notSubscribeModal.forEach((element) => {
                element.removeAttribute('aria-hidden');
            })
        }
        const _hideNotSubscribeModal = () => {
            notSubscribeModal.forEach((element) => {
                element.setAttribute('aria-hidden', 'true');
            })
        }
        const _showSubscribeModal = () => {
            _hideNotSubscribeModal()
            subscribeModal.classList.remove('hidden');
            subscribeInputEmail.value = '';
        }
        const _hideSubscribeModal = () => {
            _showNotSubscribeModal();
            subscribeModal.classList.add('hidden');
            _oldFocusElement.focus();
        }

        if (_getParameterByName('action') === 'subscribe') {
            body.classList.add("subscribe-success");
        }

        subscribeCloseButton.addEventListener('click', (event) => {
            event.preventDefault();
            subscribeSuccessMessage.classList.add('close');
        });

        subscribeModalClose.forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                _hideSubscribeModal()
            });
        });

        window.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                _hideSubscribeModal()
            }
        })

        if (window.location.hash === '#subscribe') {
            _showSubscribeModal()
        }

        subscribeButtons.forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                _oldFocusElement = element;
                _showSubscribeModal()
            });
        });
    }

    _fitVids();
    _gallery();
    _subscribeFeature();
})();


}
/*
     FILE ARCHIVED ON 03:53:30 May 16, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:13:34 Aug 23, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 223.642
  exclusion.robots: 0.108
  exclusion.robots.policy: 0.095
  cdx.remote: 0.08
  esindex: 0.011
  LoadShardBlock: 187.116 (3)
  PetaboxLoader3.datanode: 207.019 (5)
  load_resource: 258.208
  PetaboxLoader3.resolve: 97.627
  loaddict: 118.653
*/