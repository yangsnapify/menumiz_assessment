function Util() { }
Util.prototype.addCssLink = function (href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
}
Util.prototype.addJsScript = function (src, async = false, defer = false) {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    document.body.appendChild(script);
}

Util.prototype.getRoutes = function () {
    return [
        {
            name: "Dashboard",
            url: "./leave.html"
        },
        {
            name: "Notifications",
            url: "./notification.html"
        },
        {
            name: "Approve",
            url: "./approve.html"
        },
    ]
}
Util.prototype.getId = function(){
    return {
        "SIDEBAR": "SIDEBAR",
        "BREADCRUMB": "BREADCRUMB"
    }
}
Util.prototype.addData = function(key, data) {
    localStorage.setItem(key, data)
}
Util.prototype.getData = function(key) {
    return localStorage.getItem(key)
}
Util.prototype.go = function (url) {
    return window.open(url, "_self")
}
Util.prototype.mount = function (id, content) {
    if (!id || !content) return;
    document.getElementById(id).innerHTML = content;
}
Util.prototype.sideBarInit = function (routes) {
    const storage = this.getId().SIDEBAR
    const _val = this.getData(storage) || 0
    const r = routes || this.getRoutes();
    const go = this.go.bind(this);
    const _addData = this.addData.bind(this);
    const ui = r.map((x, i) => (`
        <div id="sidebaritem_${i}" class="sidebaritem ${_val == i ? 'sidebarselected' : "sidebarunselected"}">
            <div class="sidebaricon">
                <img src="../assets/img/calendar.png" />
            </div>
            <div>${x.name}</div>    
        </div>
    `)).join("");

    this.mount("sidebar", `<div class="sidebarlogo">
        <img src="../assets/img/brand.png" />
        <div>HR HR</div>
    </div>${ui}`)

    r.forEach((x, i) => {
        const element = document.getElementById(`sidebaritem_${i}`);
        if (element) {
            element.addEventListener('click', function () {
                _addData(storage, i)
                go(r[i].url)
            });
        }
    });
}

/**
 * @param {rowCount} rowCount the numbers of rendered content 
 * @param {rowsData} rowsData array thats contains rows's display data
 * @param {contentFormatter} contentFormatter function for formatting the rows's content
 */
Util.prototype.makeTimeLineRows = function(rowCount = 7, rowsData, contentFormatter) {
    return Array.from({ length: rowCount }).map((x, i) => ( contentFormatter ? contentFormatter(x) : `<div>${rowsData[i] || ""}</div>`))
}