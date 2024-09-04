
(function (w) {
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        script.onerror = function () {
            console.error(`Failed to load script: ${src}`);
        };
        document.head.appendChild(script);
    }


    const scriptPath = "../assets/js"
    const stylePath = "../assets/css"

    document.addEventListener('DOMContentLoaded', function () {
        loadScript(`${scriptPath}/util.js`, function () {
            const _util = new w.Util();
            w._util = _util;
            _util.addCssLink(`${stylePath}/reset.css`);
            _util.addCssLink(`${stylePath}/main.css`);
            _util.sideBarInit();
        })
    });
})(window)