chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "fix-rtl-font",
        title: "راست‌چین کردن متن انتخابی",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "fix-rtl-font") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: applyStylesToSelection
        });
    }
});

function applyStylesToSelection() {
    const fontList = "'Vazirmatn', 'Vazir', 'Tahoma', 'Segoe UI', sans-serif";
    const styles = {
        direction: "rtl",
        textAlign: "right",
        fontFamily: fontList
    };

    const selection = window.getSelection();
    let targets = [];

    if (selection.rangeCount > 0 && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        let commonAncestor = range.commonAncestorContainer;

        if (commonAncestor.nodeType === 3) {
            commonAncestor = commonAncestor.parentElement;
        }

        targets.push(commonAncestor);

    }
    else {
        targets.push(document.activeElement);
    }

    targets.forEach(element => {
        if (!element) return;

        element.style.direction = styles.direction;
        element.style.textAlign = styles.textAlign;
        element.style.fontFamily = styles.fontFamily;

        element.style.setProperty("direction", "rtl", "important");
        element.style.setProperty("text-align", "right", "important");
        element.style.setProperty("font-family", fontList, "important");

        const blockChildren = element.querySelectorAll('p, div, li, span, h1, h2, h3, h4, h5, h6, td');
        blockChildren.forEach(child => {

            child.style.direction = "rtl";
            child.style.textAlign = "right";
            child.style.fontFamily = fontList;
        });
    });
}