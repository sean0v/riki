export function loadConfig() {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', 'config.json', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let jsonData = JSON.parse(xhr.responseText);
                    resolve(jsonData);
                } else {
                    reject(new Error('Failed to load JSON'));
                }
            }
        };
        xhr.send();
    });
}