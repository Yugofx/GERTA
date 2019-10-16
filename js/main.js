// Desktop scroll events reactions
const IS_MOBILE = document.body.clientWidth < 768;
const IS_TABLET = document.body.clientWidth < 1025 && document.body.clientWidth >= 768;
const IS_DESKTOP = document.body.clientWidth >= 1025;

const getDeviceType = () => IS_MOBILE ? 'mobile' : IS_TABLET ? 'tablet' : 'desktop';
const getSrc = dir => (index, type, slide) => `photos/${dir}/${getDeviceType()}/${type}/${index}/${slide || '1'}.jpg`;
const checkImg = src => new Promise((res, rej) => {
    const img = new Image();
    img.onload = res;
    img.onerror = rej;
    img.src = src;
});

// const pipe = (...fns) => (arg) => fns.reduce((argument, fn) => fn(argument), arg);
const defer = fn => setTimeout(fn);
const last = arr => arr.length > 0 ? arr[arr.length - 1] : null;

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
    fixHeader(header, layer.scrollTop < 98);
    return function() {
        const isFirstScreen = layer.scrollTop < window.innerHeight;
        const isTop = layer.scrollTop < 98;
        const isFooter = footer.getBoundingClientRect().top < layer.clientHeight;

        fixHeader(header, isTop);
        showBanner(banner, !isFirstScreen && !isFooter);
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

const initWorks = (gallery => {
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