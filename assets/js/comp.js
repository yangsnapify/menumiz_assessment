window.breadCrumbInit = function (id, routes) {
    setTimeout(() => {
        const val = window._util.getData(id);
        const ui = routes.map((x, i) => (`
            <div id="breadcrumbitems${i}" class="${val == i ? 'breadcrumb_selected' : 'breadcrumb_unselected'}">
                <div class="breadcrumbnames">${x.name}</div>
                <div class="${val == i ? 'breadcrumb_line' : ''}"></div>
            </div>
        `)).join("")

        _util.mount(id, `${ui}`)

        routes.forEach((x, i) => {
            const element = document.getElementById(`breadcrumbitems${i}`);
            if (element) {
                element.addEventListener('click', function () {
                    window._util.addData(id, i);
                    window.location.reload()
                });
            }
        });
    }, 300);
}

/**
 * @param {*} id unqiue identifier to mount
 * @param {*} data {name, content, hideSectionName} 
 */
window.heatmapInit = function(id, data) {
    setTimeout(() => {

        const ui = `
            <div class="title ${data?.hideSectionName ? 'h35' : ''}">${!data?.hideSectionName ? 'Dashboard' : ''}</div>
            <div class="heatmap">
                <div class="heatmapbar">
                    ${data?.name || "Heatmap"}  
                </div>
                <div class="heatmapcontent">
                    ${data.content}
                </div>
                <div class="heatmapfooter"></div>
            </div>
        `

        _util.mount(id, `${ui}`)
    }, 300);
}

/**
 * @param {*} id unqiue identifier to mount
 * @param {*} data {selectData: { name: string, callback: () => void }[]}
 */
window.horizonSelect = function(id, data) {
    setTimeout(() => {
        const val = window._util.getData(id);
        const ui = data.selectData.map((x, i) => (`
            <div id="horizonselectitems${i}" class="${val == i ? 'horizon_selected' : 'horizon_unselected'} horizonselect">
                <div class="horizonselectnames">${x.name}</div>
            </div>
        `)).join("")

        _util.mount(id, `${ui}`)

        data.selectData.forEach((x, i) => {
            const element = document.getElementById(`horizonselectitems${i}`);
            if (element) {
                element.addEventListener('click', function () {
                    window._util.addData(id, i);
                    x?.callback && x.callback()
                    window.location.reload()
                });
            }
        });
    }, 300);
}

/**
 * @param {*} data {progressData: {name:string, percent:string}[]} 
 */
window.progressbar = function(id, data) {
    setTimeout(() => {
        const ui = data.progressData.map((x) => (`<div class="progress">
             <div class="progressname">${x.name}</div>
             <div class="progresscontent">
                <div class="progressround">
                    <span class="progresspercent">70%</span>
                    <div class="progressinner"></div>
                </div>
             </div>
        </div>`)).join("")
           
        _util.mount(id, `${ui}`)
    }, 300);
}

/**
 * @param {*} id unqiue identifier to mount
 * @param {*} data { tableData<T>, keyNames }
 */
window.table = function(id, data) {
    const { tableData } = data;
   
    setTimeout(() => {
        const tableui = tableData.map((x) => {
            const displayValues = Object.values(x);
            return (`<div class="row whiteFont normalFont">
                ${displayValues.map((x) => (`<div class="rowchild">${x}</div>`)).join("")}
            </div>`)
        }).join("");
        const keyNames = Object.keys(tableData[0])
        const tableWrapper = `<div>
            <div class="tablescolumns normalFont">
                ${keyNames.map((x) => (`<div>${x}</div>`)).join("")}
            </div>
            ${tableui}
        </div>`

        _util.mount(id, `${tableWrapper}`)
    }, 300);
}

/**
 * 
 * @param {id} id a unique identifier to mount
 * @param {data} data {  } 
 */
window.timeline = function(id, data) {
    setTimeout(() => {
        // dummy data
        const rowsData = ["Week 40 hours", "Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"]
        const dateUI = _util.makeTimeLineRows(7, rowsData);
        const dayNotesUI = _util.makeTimeLineRows(7, ["Day Notes"]);
        const timelimeUI = ``
        const combimeUI = `<div>
            <div class="timelinebatch timelimeFont">
                <div class="batch1">${dateUI.join("")}</div>
                <div class="batch2">${dayNotesUI.join("")}</div>
            </div>
            <div>${timelimeUI}</div>
        </div>`;

        _util.mount(id, `${combimeUI}`)
    }, 300);
}

/**
 * @param {*} id a unqiue identifier
 * @param {*} data the display name tag content
 * @param {arg} toggleId the id of content you wish to toggle
 */
window.timelimeDropdown = function(id, data, toggleId) {
    const { name } = data;
    const _id = `tmldrop${id}`;
    setTimeout(() => {
        const storage = _util.getData(_id);
        const ui = `<div id="${_id}" class="timelinedropdown whiteFont">
            ${storage == 0 ? '<img src="../assets/img/arrow-up.png" />' : '<img src="../assets/img/arrow-down.png" />'}
            <div>${name}</div>
        </div>`
        _util.mount(id, `${ui}`);

        const isTrue = storage == 0;
        const el = document.getElementById(toggleId);
        if (el) {
            if (isTrue) {
                el.classList.add("hide")
            } else {
                el.classList.remove("hide")
            }
        }

        const element = document.getElementById(_id);
        if (element) {
            element.addEventListener("click", function() {
                _util.addData(_id, isTrue ? 1 : 0);
                window.location.reload()
            })
        }
    }, 300);
}