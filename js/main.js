// TODO: we need to wrap all helpers into g object in case to support Safari 
// not finding global variables defined with 'const' and 'let' in module scope
var g = {
    IS_MOBILE: document.body.clientWidth < 768,
    IS_TABLET: document.body.clientWidth < 1025 && document.body.clientWidth >= 768,
    IS_DESKTOP: document.body.clientWidth >= 1025,
    
    getDeviceType() {
        return g.IS_MOBILE ? 'mobile' : g.IS_TABLET ? 'tablet' : 'desktop'
    },
    loadImagesOnTargetIntersection(container, target) {
        const observer = new IntersectionObserver(([point]) => {
            if (point.isIntersecting) {
                observer.unobserve(target);
                container.querySelectorAll('[data-src]').forEach(img => {
                    img.src = img.dataset.src;
                })
            }
        });
        observer.observe(target);
    },
    appendFromTemplate(id, container) {
        container.appendChild(document.getElementById(id).content);
        return container.lastElementChild;
    },
    getDayType() {
        const hours = (new Date()).getHours();
        return (hours >= 5 && hours <= 19) ? 'day' : 'night';
    },
    appendBanner() {
        return g.appendFromTemplate(`${g.getDayType()}-belt`, document.body);
    },
    modal: (modal => {
        const mainLayer = modal.previousElementSibling;
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
            mainLayer.classList.add('-lock-scroll');
        };
        const close = () => {
            modal.addEventListener('transitionend', _unload, { once: true });
            modal.classList.remove('-up');
            mainLayer.classList.remove('-lock-scroll');
        };
        const register = btn => btn.addEventListener('click', open.bind(null, btn.dataset), {passive: true});
        const content = () => container.lastElementChild;
        const data = () => _data;
        
        // closeBtn.addEventListener('click', close);
        backdrop.addEventListener('click', close);
    
        document.body.querySelectorAll('[data-modal]').forEach(btn => register(btn));
    
        return { open, close, register, content, data };
    })(document.body.querySelector('.modal-layer')), 
};

(gallery => {
    const id = gallery ? 'works-gallery' : 'works-clients';
    const container = g.appendFromTemplate(id, document.body.querySelector('section.works'));
    const modalInitiator = container.dataset.modal ? container : container.querySelector('[data-modal]');

    modalInitiator.addEventListener('click', e =>
        modalInitiator.setAttribute('data-modal-data', e.target.dataset.modalData));

    g.modal.register(modalInitiator);
})(g.IS_TABLET || g.IS_MOBILE);

if (g.IS_DESKTOP) {
    (new IntersectionObserver(([point]) => {
        const fnName = point.isIntersecting ? 'add' : 'remove';
        document.querySelector('.page-header').classList[fnName]('-clean');
    }, {})).observe(document.querySelector('.main-layer .header-intersection-checkpoint'));
}

(() => {
    const banner = g.IS_DESKTOP ? g.appendBanner() : document.querySelector('.contact-panel');
    let skipFirstCheck = true;

    (new IntersectionObserver(([point]) => {
        if (point.isIntersecting && point.boundingClientRect.top > 0) {
            banner.classList.add('-on');
        }
        if (!point.isIntersecting && point.boundingClientRect.top > 0) {
            banner.classList.remove('-on');
        }
    }, {})).observe(document.querySelector('.reasons'));

    (new IntersectionObserver(([point]) => {
        if (skipFirstCheck) return (skipFirstCheck = false);
        banner.classList[point.isIntersecting ? 'remove' : 'add']('-on');
    }, {})).observe(document.querySelector('.page-footer'));
})();

// Фичи
(() => {
    const warranties = document.querySelector('.warranty .swiper-container');
    const warrantySwiper = new Swiper(warranties, {
        navigation: {
            nextEl: warranties.querySelector('.swiper-button-next'),
            prevEl: warranties.querySelector('.swiper-button-prev')
        },
        autoHeight: true
    });
})();

// Feedback
(() => {
    const container = document.querySelector('.feedback .swiper-container');
    const swiper = new Swiper(container, {
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: container.querySelector('.swiper-button-next'),
            prevEl: container.querySelector('.swiper-button-prev'),
        },
    });
})();

// Отзывы
(() => {
    const activate = thumb => {
        [...thumb.parentNode.children].forEach(t => t.classList.remove('-active'));
        thumb.classList.add('-active');
        const img = thumb.parentNode.previousElementSibling.firstElementChild;
        img.src = thumb.firstElementChild.dataset.src.replace(/preview/, g.getDeviceType());
    };
    
    const tContainer = document.querySelector('.testimonials .swiper-container');
    const swiper = new Swiper(tContainer, {
        navigation: {
            nextEl: tContainer.querySelector('.swiper-button-next'),
            prevEl: tContainer.querySelector('.swiper-button-prev'),
        },
    });

    g.loadImagesOnTargetIntersection(tContainer, document.querySelector('.catalog'));
    tContainer.querySelectorAll('.swiper-slide')
        .forEach(slide => activate(slide.querySelector('.thumb')));

    tContainer.addEventListener('click', e => {
        if (!e.target.classList.contains('thumb')) return;
        activate(e.target);
    });
})();

// Каталог
(() => {
    const selectStyle = button => {
        if (_activeButton === button) return;
        if (_activeButton) _activeButton.classList.remove('-active');
        _activeButton = button;
        _activeButton.classList.add('-active');
        catalogDrawer.redraw(_activeButton.dataset.style);
    };

    const _createCatalogDrawer = (c) => {
        const registry = {};
        const t = document.getElementById(g.IS_DESKTOP ? 'catalog-tiles' : 'catalog-gallery');
        const container = t.content.firstElementChild;
        const tmp = container.querySelector('template')

        let _style = null;
        let _swiper = null;

        c.appendChild(t.content);
        if (!g.IS_DESKTOP) {
            _swiper = new Swiper(container, {
                navigation: {
                    nextEl: container.querySelector('.swiper-button-next'),
                    prevEl: container.querySelector('.swiper-button-prev'),
                },
            })
        }

        const _drawItem = () => {
            const kitchens = gertaConfig.catalog.items[_style];
            for (let i = 0; i < kitchens.length; i++) {
                const kitchen = kitchens[i];
                const item = tmp.content.cloneNode(true);
                item.querySelector('img').src = gertaConfig.catalog.previewSrc(i + 1, _style, g.getDeviceType());
                item.firstElementChild.setAttribute('data-modal-data', JSON.stringify({ index: i + 1, style: _style }));
                if (_swiper) _swiper.appendSlide(item);
                else {
                    if (typeof kitchen.oldPrice === 'number') {
                        const it = item.querySelector('.item');
                        item.querySelector('.price .prev').appendChild(document.createTextNode(`${kitchen.oldPrice} Р`));
                        it.classList.add('-discount');
                        it.setAttribute('data-diff', `${parseInt((kitchen.oldPrice - kitchen.currentPrice) / kitchen.oldPrice * 100)}%`);
                    };
                    item.querySelector('.price .new').appendChild(document.createTextNode(`от ${kitchen.currentPrice} Р`));
                    tmp.parentNode.appendChild(item);
                };
            }
        };

        const _deferedRegistryFill = () => {
            Object.keys(gertaConfig.catalog.items).forEach(style => {
                if (style === _style) return;
                const fragment = document.createDocumentFragment();
                setTimeout(() => {
                    for (let i = 1; i <= gertaConfig.catalog.items[style].length; i++) {
                        const item = tmp.content.cloneNode(true);
                        item.querySelector('img').src = gertaConfig.catalog.previewSrc(i, style, g.getDeviceType());
                        item.firstElementChild.setAttribute('data-modal-data', JSON.stringify({ index: i, style }));
                        fragment.appendChild(item);
                    }
                });
            });
        };

        const _clear = () => {
            if (!_style) return;
            const fragment = document.createDocumentFragment();
            const items = container.querySelectorAll(g.IS_DESKTOP ? '.item' : '.swiper-slide');
            items.forEach((i) => fragment.appendChild(i));
            registry[_style] = fragment;
        }

        const redraw = style => {
            _clear();
            _style = style;
            if (style in registry) {
                if (g.IS_DESKTOP) container.appendChild(registry[style]);
                else [...registry[style].children].forEach(s => _swiper.appendSlide(s));
            } else {
                _drawItem();
            }
        };

        const modalInitiator = g.IS_DESKTOP ? container : container.firstElementChild;
        modalInitiator.addEventListener('click', e => {
            let target = e.target;
            while (target !== modalInitiator) {
                if (target.dataset.modalData) break;
                target = target.parentNode;
            }
            modalInitiator.setAttribute('data-modal-data', target.dataset.modalData);
        });
        g.modal.register(modalInitiator);

        return { redraw, runDefferedRegistryFill: _deferedRegistryFill };
    };

    let _activeButton = null;

    const toolbar = document.querySelector('.catalog .toolbar');
    const catalogDrawer = _createCatalogDrawer(toolbar.parentNode);
    selectStyle(toolbar.firstElementChild.firstElementChild);
    const observer = new IntersectionObserver(([point]) => {
        if (point.isIntersecting) {
            observer.unobserve(toolbar);
            catalogDrawer.runDefferedRegistryFill();
        } 
    });
    observer.observe(toolbar);

    toolbar.addEventListener('click', e => {
        if (e.target.tagName !== 'BUTTON') return;
        selectStyle(e.target);
    });
})();