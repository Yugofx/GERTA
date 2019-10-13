// Header styles on scroll
(() => {
    const mainLayer = document.querySelector('.main-layer');

    if (document.body.clientWidth < 1025) return;
    function switchHeaderTheme() {
        const header = mainLayer.querySelector('.page-header');
        if (mainLayer.scrollTop < 98) {
            if (header.classList.contains('-clean')) return;
            header.classList.add('-clean');
        } else if (header.classList.contains('-clean')) {
            header.classList.remove('-clean');
        }
    }

    switchHeaderTheme();
    mainLayer.addEventListener('scroll', switchHeaderTheme, { passive: true });
})();

const modal = (function modal() {
    const m = document.querySelector('.modal-layer');
    const b = m.querySelector('.modal-body');
    const clsBtn = m.querySelector('.modal-close');
    const bd = m.querySelector('.modal-backdrop');

    const registry = {};
    let activeTemplate = null;

    const _load = (key) => {
        if (!(key in registry)) throw new Error('No template saved for key: ' + key);
        if (activeTemplate) modal.unload();
        activeTemplate = registry[key];
        b.appendChild(activeTemplate);
    };
    const _unload = () => {
        if (activeTemplate === null) return;
        b.removeChild(activeTemplate);
        activeTemplate = null;
    };
    const register = (key, template) => {
        if (key in registry && registry[key] !== template) console.warn('You overrided a template for the ket ' + key);
        registry[key] = template;
    };
    const open = (key) => {
        // _load(key);
        m.classList.add('-up')
    };
    const close = () => {
        m.classList.remove('-up');
        _unload();
    };

    clsBtn.addEventListener('click', close);
    bd.addEventListener('click', close);
    
    return { open, close, register };
})();