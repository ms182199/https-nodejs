// Files and modules

const config = require("./config.js")
const util = require("./util.js")

const fs = require("fs")

// Routing

function route(path, cookies) {
    return new Promise(async (resolve, reject) => {
        // Pages
        if (path === "/") {
            // Home

            util.read_file("public/home/home.html").then(home => {
                resolve({
                    code: 200,
                    mimeType: "text/html",
                    data: home
                })
            }).catch(error => {
                reject(error)
            })}
					      
				else if (path === "/index") {
            // Home

            util.read_file("public/home/index.php").then(home => {
                resolve({
                    code: 200,
                    mimeType: "text/php",
                    data: home
                })
            }).catch(error => {
                reject(error)
            })				 }

        // ADD NEW "PAGES" ON THE CONDITIONAL ABOVE
        // NOTE THAT ANY RESOURCES REQUESTED NEED TO BE IN THE PUBLIC FOLDER
        // AND IMAGES REQUESTED NEED TO BE IN public/images

        // Files

        else if (path.startsWith("/public")) {
            // Find file

            path = path.substr(1)
            if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
                // File
                
                util.read_file(path).then(file => {
                    if (path.includes("/images")) {
                        resolve({
                            code: 200,
                            mimeType: "image",
                            data: file
                        })
                    } else {
                        const ext = path.split(".")[path.split(".").length - 1]
                        if (ext === "html") {
                            resolve({
                                code: 200,
                                mimeType: "text/plain",
                                data: file
                            })
                        } else {
                            resolve({
                                code: 200,
                                mimeType: `text/${ext}`,
                                data: file
                            })
                        }
                    }
                }).catch(error => {
                    reject(error)
                })
            } else {
                // File not found

                resolve({
                    code: 404
                })
            }
        }

        // Not found

        else {
            resolve({
                code: 404
            })
        }
    })
}

// Exports

module.exports = route