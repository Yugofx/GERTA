const IS_MOBILE = document.body.clientWidth < 768;
const IS_TABLET = document.body.clientWidth < 1025 && document.body.clientWidth >= 768;
const IS_DESKTOP = document.body.clientWidth >= 1025;

const getDeviceType = () => IS_MOBILE ? 'mobile' : IS_TABLET ? 'tablet' : 'desktop';
const getSrc = dir => (index, type, slide = 1) => `photos/${dir}/${getDeviceType()}/${type}/${index}/${slide}.jpg`;
const checkImg = src => new Promise((res, rej) => {
    const img = new Image();
    img.onload = res;
    img.onerror = rej;
    img.src = src;
});

function appendFromTemplate(id, container) {
    container.appendChild(document.getElementById(id).content);
    return container.lastElementChild;
}

// HEADER
function fixHeader(header, isTop) {
    const isClean = header.classList.contains('-clean');
    if ((isTop && isClean) || (!isTop && !isClean)) return;

    header.classList[isTop ? 'add' : 'remove']('-clean');
}

// BANNER
function getDayType() {
    const hours = (new Date()).getHours();
    return (hours >= 5 && hours <= 19) ? 'day' : 'night';
}
function appendBanner() {
    return appendFromTemplate(`${getDayType()}-belt`, document.body);
}
function showBanner(banner, show) {
    const isOn = banner.classList.contains('-on');
    if ((show && isOn) || (!show && !isOn)) return;
    banner.classList[show ? 'add' : 'remove']('-on');
}

// scroll
function createScrollListener(layer, header, footer, banner) {
    // Initial runs
    fixHeader(header, layer.scrollTop < 98);
    // draw testimonials if close to the viewport

    return function() {
        const isFirstScreen = layer.scrollTop < window.innerHeight;
        const isTop = layer.scrollTop < 98;
        const isFooter = footer.getBoundingClientRect().top < layer.clientHeight;

        fixHeader(header, isTop);
        showBanner(banner, !isFirstScreen && !isFooter);
        // draw testimonials if close to the viewport
    }
}
function attachScrollListener(layer) {
    const header = layer.querySelector('.page-header');
    const footer = layer.querySelector('.page-footer');
    const banner = appendBanner();

    layer.addEventListener('scroll', createScrollListener(layer, header, footer, banner), { passive: true });
}

const modal = (modal => {
    const backdrop = modal.querySelector('.modal-backdrop');
    const closeBtn = modal.querySelector('.modal-close');
    const container = modal.querySelector('.modal-content');

    let _activeTemplate = null;
    let _data = null;

    const _unload = () => {
        if (!_activeTemplate) return;
        container.removeChild(_activeTemplate);
        _activeTemplate = null;
        _data = null;
    }
    const _load = id => {
        container.appendChild(document.getElementById(id).content.cloneNode(true));
        _activeTemplate = container.lastElementChild;
    };

    const open = data => {
        if (_activeTemplate) _unload();
        if (data.modalData) _data = JSON.parse(data.modalData);
        _load(data.modal);
        modal.classList.add('-up');
    };
    const close = () => {
        modal.addEventListener('transitionend', _unload, { once: true });
        modal.classList.remove('-up');
    };
    const register = btn => btn.addEventListener('click', open.bind(null, btn.dataset), {passive: true});
    const content = () => container.lastElementChild;
    const data = () => _data;
    
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);

    document.body.querySelectorAll('[data-modal]').forEach(btn => register(btn));

    return { open, close, register, content, data };
})(document.body.querySelector('.modal-layer'));

// Кейсы
(gallery => {
    const id = gallery ? 'works-gallery' : 'works-clients';
    const container = appendFromTemplate(id, document.body.querySelector('section.works'));
    const modalInitiator = container.dataset.modal ? container : container.querySelector('[data-modal]');

    modalInitiator.addEventListener('click', e =>
        modalInitiator.setAttribute('data-modal-data', e.target.dataset.modalData));

    modal.register(modalInitiator);
})(IS_TABLET || IS_MOBILE);

if (IS_DESKTOP) {
    attachScrollListener(document.querySelector('.main-layer'));
}

// Фичи
(() => {
    const warrantySwiper = new Swiper('.warranty .swiper-container', {
        navigation: {
            nextEl: '.list .swiper-button-next',
            prevEl: '.list .swiper-button-prev',
        },
        autoHeight: true
    });
})();

// Отзывы
(() => {
    const activate = thumb => {
        [...thumb.parentNode.children].forEach(t => t.classList.remove('-active'));
        thumb.classList.add('-active');
        const img = thumb.parentNode.previousElementSibling.firstElementChild;
        img.src = thumb.firstElementChild.src.replace(/preview/, getDeviceType());
    };
    
    const tContainer = document.querySelector('.testimonials .swiper-container');
    const swiper = new Swiper(tContainer, {
        navigation: {
            nextEl: tContainer.querySelector('.swiper-button-next'),
            prevEl: tContainer.querySelector('.swiper-button-prev'),
        },
    });
    tContainer.querySelectorAll('.swiper-slide')
        .forEach(slide => activate(slide.querySelector('.thumb')));

    tContainer.addEventListener('click', e => {
        if (!e.target.classList.contains('thumb')) return;
        activate(e.target);
    });
})();

// Каталог
(() => {
    let _activeButton = null;
    let _swiper = null;
    const registry = {};
    const cSrc = (style, type, index, pos = null) => `photos/catalog/${getDeviceType()}/${style}/${type}/${index}${pos ? `/${pos}.jpg` : '.jpg'}`;

    const selectStyle = button => {
        if (_activeButton === button) return;
        if (_activeButton) _activeButton.classList.remove('-active');
        _activeButton = button;
        _activeButton.classList.add('-active');
        catalogDrawer(_activeButton.dataset.style);
    };

    const _draw = (c) => {
        const t = document.getElementById(IS_DESKTOP ? 'catalog-tiles' : 'catalog-gallery');
        const container = t.content.firstElementChild;
        c.appendChild(t.content);
        let _style = null;
        if (!IS_DESKTOP) {
            _swiper = new Swiper(container, {
                navigation: {
                    nextEl: container.querySelector('.swiper-button-next'),
                    prevEl: container.querySelector('.swiper-button-prev'),
                },
            })
        }

        const _drawItem = (start = 1) => {
            const src = cSrc(_style, 'preview', start);
            checkImg(src)
                .then(() => {
                    const tmp = container.querySelector('template')
                    const item = tmp.content.cloneNode(true);
                    item.querySelector('img').src = src;
                    item.firstElementChild.setAttribute('data-modal-data', JSON.stringify({ index: start, style: _style }));
                    if (_swiper) _swiper.appendSlide(item);
                    else tmp.parentNode.appendChild(item);
                    _drawItem(start + 1);
                })
                .catch(() => console.warn('Если это не все фото, убедитесь, что соблюдается последовательность наименования'));
        };

        const _clear = () => {
            if (!_style) return;
            const fragment = document.createDocumentFragment();
            const items = container.querySelectorAll(IS_DESKTOP ? '.item' : '.swiper-slide');
            items.forEach((i) => fragment.appendChild(i));
            registry[_style] = fragment;
        }

        const redraw = style => {
            _clear();
            _style = style;
            if (style in registry) {
                if (IS_DESKTOP) container.appendChild(registry[style]);
                else [...registry[style].children].forEach(s => {
                    container.firstElementChild.appendChild(s);
                    _swiper.appendSlide(s);
                });
            } else {
                _drawItem();
            }
        };

        const modalInitiator = IS_DESKTOP ? container : container.firstElementChild;
        modalInitiator.addEventListener('click', e => {
            let target = e.target;
            while (target !== modalInitiator) {
                if (target.dataset.modalData) break;
                target = target.parentNode;
            }
            modalInitiator.setAttribute('data-modal-data', target.dataset.modalData);
        });
        modal.register(modalInitiator);

        return redraw;
    };

    const toolbar = document.querySelector('.catalog .toolbar');
    const catalogDrawer = _draw(toolbar.parentNode);
    selectStyle(toolbar.firstElementChild.firstElementChild);
    toolbar.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON') return;
        selectStyle(e.target);
    });
})();
