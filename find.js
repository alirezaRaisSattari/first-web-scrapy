const axios = require('axios');

a("https://www.araiesh.com/search/all/joybar")













async function a(
    url1,
    // url2,
) {
    let links = []
    let promises
    await axios.get(url1)
        .then(function (response) {
            let firstElement = response.data.search(`<div style='font-size:0px'>`);
            let out = response.data.slice(firstElement + 10)
            firstElement = out.search(`<div style='font-size:0px'>`);
            const lastElement = response.data.search(`<div style='padding-top:10px'>`);
            out = out.slice(firstElement, lastElement)
            while (out.search(`'https://www.araiesh.com/`) !== -1) {
                const firstLink = out.search(`'https://www.araiesh.com/`);
                let x = out.slice(firstLink)
                const lastLink = x.search(`'>`) + firstLink;
                if (out.slice(firstLink, lastLink - 2).search("images") !== -1 || out.slice(firstLink, lastLink - 2).search("/best/") !== -1 || out.slice(firstLink, lastLink - 2).search("/form") !== -1 || out.slice(firstLink, lastLink - 2).search("/search/") !== -1 || out.slice(firstLink, lastLink - 2).search("/view") !== -1) {
                    out = out.slice(lastLink + 10);
                    continue;
                }
                links.push(out.slice(firstLink + 1, lastLink))
                out = out.slice(lastLink + 10)
            }
            console.log(links);
        }).catch(function (error) {
            console.log(error);
        })
    // await axios.get(url2)
    //     .then(function async(response) {
    //         let firstElement = response.data.search(`<div style='font-size:0px'>`);
    //         let out = response.data.slice(firstElement + 10)
    //         firstElement = out.search(`<div style='font-size:0px'>`);
    //         const lastElement = response.data.search(`<div style='padding-top:10px'>`);
    //         out = out.slice(firstElement, lastElement)
    //         while (out.search(`'https://www.araiesh.com/`) !== -1) {
    //             const firstLink = out.search(`'https://www.araiesh.com/`);
    //             let x = out.slice(firstLink)
    //             const lastLink = x.search(`'>`) + firstLink;
    //             if (out.slice(firstLink, lastLink - 2).search("images") !== -1 || out.slice(firstLink, lastLink - 2).search("/best/") !== -1 || out.slice(firstLink, lastLink - 2).search("/form") !== -1 || out.slice(firstLink, lastLink - 2).search("/search/") !== -1 || out.slice(firstLink, lastLink - 2).search("/view") !== -1) {
    //                 out = out.slice(lastLink + 10);
    //                 continue;
    //             }
    //             links.push(out.slice(firstLink + 1, lastLink))
    //             out = out.slice(lastLink + 10)
    //         }
    //         console.log(links);
    //     }).catch(function (error) {
    //         console.log(error);
    //     })


    promises = () => links.map((e, i) =>
        axios.get(e)
            .then(function (response) {
                const firstElement = response.data.search(`<b>نام</b>`);
                let outputName = response.data.slice(firstElement + 90, firstElement + 200)
                const lastElement = outputName.search(`<`);
                outputName = outputName.slice(0, lastElement)

                let firstElement1 = response.data.search(`<b>شماره همراه</b>`);
                let outputName1 = response.data.slice(firstElement1 + 134, firstElement1 + 200)
                const lastElement1 = outputName1.search(`</a>`);
                outputName1 = outputName1.slice(0, lastElement1)

                const firstElement1z = response.data.search(`<b>شماره ثابت</b>`);
                let outputName1z = response.data.slice(firstElement1z + 134, firstElement1z + 200)
                const lastElement1z = outputName1z.search(`</a>`);
                outputName1z = outputName1z.slice(0, lastElement1z)

                const firstElement1z2 = response.data.search(`<b>شماره ثابت</b>`);
                let outputName1z2 = response.data.slice(firstElement1z2 + 97, firstElement1z2 + 200)
                const lastElement1z2 = outputName1z2.search(`</td>`);
                outputName1z2 = outputName1z2.slice(0, lastElement1z2)

                const firstElement1zz = response.data.search(`<b>نام مدیریت</b>`);
                let outputName1zz = response.data.slice(firstElement1zz + 95, firstElement1zz + 200)
                const lastElement1zz = outputName1zz.search(`</td>`);
                outputName1zz = outputName1zz.slice(0, lastElement1zz)

                return { 0: outputName, 1: outputName1.length < 20 ? outputName1 : null, 2: outputName1z.length < 20 ? outputName1z : null, 3: outputName1zz.length < 20 ? outputName1zz : null, 4: outputName1z2.length < 20 ? outputName1z2 : null }
            })
            .catch(function (error) {
                // handle error
                console.log(error.response)
            })
    )

    for await (num of promises()) {
        num
    }

    let res = await Promise.all(promises())

    const fs = require('fs');

    const writeStream = fs.createWriteStream('data.txt');

    res.forEach(e => {
        if (e) writeStream.write(JSON.stringify(e) + ",")
    })
}