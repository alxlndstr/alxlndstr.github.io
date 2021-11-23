/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/anim/index.ts":
/*!***************************!*\
  !*** ./src/anim/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.animate = exports.separateString = exports.interpolateColor = exports.isColor = void 0;\r\nlet active = false;\r\nconst currentAnimations = [];\r\nconst isColor = (str) => /#([a-zA-Z0-9]{6}|[a-zA-Z0-9]{8})/g.test(str) || /rgba?\\(\\d+, ?\\d+, ?\\d+(, ?\\d+)?\\)/g.test(str);\r\nexports.isColor = isColor;\r\nconst translateColor = (color) => {\r\n    var _a;\r\n    const rgba = /rgba?\\(\\d+, ?\\d+, ?\\d+(, ?\\d+)?\\)/g;\r\n    const hex = /#([a-zA-Z0-9]{6}|[a-zA-Z0-9]{8})/g;\r\n    switch (true) {\r\n        case rgba.test(color): {\r\n            return (_a = color.match(/\\d+/g)) === null || _a === void 0 ? void 0 : _a.map(str => +str);\r\n        }\r\n        case hex.test(color): {\r\n            let result = [];\r\n            if (color.length > 9)\r\n                console.log('String too long!');\r\n            for (let i = 1; i < color.length; i += 2) {\r\n                result.push(parseInt(color.substr(i, 2), 16));\r\n            }\r\n            return result;\r\n        }\r\n    }\r\n};\r\nconst toHex = (arr) => `#${arr.map(val => (val < 16 ? '0' : '') + val.toString(16)).join('')}`;\r\nconst toRgba = (arr) => `rgb${arr.length == 4 ? 'a' : ''}(${arr.join(', ')})`;\r\nconst interpolateColor = (initialColor, targetColor, progress) => {\r\n    const initial = translateColor(initialColor);\r\n    const target = translateColor(targetColor);\r\n    let result = [];\r\n    for (let i = 0; i < target.length; i++) {\r\n        result.push(Math.round(initial[i] + ((target[i] - initial[i]) * progress)));\r\n    }\r\n    return toRgba(result);\r\n};\r\nexports.interpolateColor = interpolateColor;\r\nconst separateString = (str) => {\r\n    const prefix = str.replace(/\\d+[\\d\\D]*$/g, '');\r\n    const number = str.replace(/[^\\-\\.\\d]/g, '');\r\n    const suffix = str.replace(/^.+\\d/, '');\r\n    return [prefix, number, suffix];\r\n};\r\nexports.separateString = separateString;\r\nconst mapProps = (target, props, options) => {\r\n    try {\r\n        const starting = {};\r\n        for (let p in props) {\r\n            if (options === null || options === void 0 ? void 0 : options.useSetAttribute) {\r\n                starting[p] = target.getAttribute(p);\r\n                continue;\r\n            }\r\n            switch (typeof (props[p])) {\r\n                case 'number':\r\n                case 'string': {\r\n                    starting[p] = target[p];\r\n                    break;\r\n                }\r\n                case 'object': {\r\n                    starting[p] = mapProps(target[p], props[p], options);\r\n                    break;\r\n                }\r\n            }\r\n        }\r\n        return starting;\r\n    }\r\n    catch (err) {\r\n        console.log(target, props);\r\n    }\r\n};\r\nconst applyComputedStyle = (target, props) => {\r\n    const style = getComputedStyle(target);\r\n    for (let p in props.style) {\r\n        target.style[p] = style.getPropertyValue(p);\r\n    }\r\n};\r\nconst applyProps = (target, props, options) => {\r\n    for (let p in props) {\r\n        if (typeof (props[p]) == 'object') {\r\n            applyProps(target[p], props[p]);\r\n        }\r\n        else {\r\n            if (options === null || options === void 0 ? void 0 : options.useSetAttribute)\r\n                target.setAttribute(p, props[p]);\r\n            else\r\n                target[p] = props[p];\r\n        }\r\n    }\r\n};\r\nconst addString = (...args) => {\r\n    const units = args.map(str => str.replace(/^[\\d\\.\\-]*/g, ''));\r\n    const nums = args.map(str => +(str.replace(/\\D[^\\.\\-)]$/g, '')));\r\n    const result = nums.reduce((total, num) => total + num);\r\n    return result.toString() + units[0];\r\n};\r\nconst updateTarget = (target, starting, props, progress, options) => {\r\n    for (let p in props) {\r\n        switch (typeof (props[p])) {\r\n            case 'number': {\r\n                const diff = props[p] - starting[p];\r\n                target[p] = starting[p] + diff * progress;\r\n                break;\r\n            }\r\n            case 'string': {\r\n                if ((0, exports.isColor)(props[p])) {\r\n                    if (options.useSetAttribute)\r\n                        target.setAttribute(p, (0, exports.interpolateColor)(starting[p], props[p], progress));\r\n                    else\r\n                        target[p] = (0, exports.interpolateColor)(starting[p], props[p], progress);\r\n                    break;\r\n                }\r\n                const [prefix, number, unit] = (0, exports.separateString)(props[p]);\r\n                const [, startingNum,] = (0, exports.separateString)(starting[p]);\r\n                //const unit = props[p].replace(/^[\\d\\.\\-]*/g, '')\r\n                //const startingNum = +(starting[p].replace(/\\D[^\\.\\-)]$/g, ''));\r\n                const diff = +number - +startingNum;\r\n                if (options.useSetAttribute)\r\n                    target.setAttribute(p, (+startingNum + diff * progress).toString() + unit);\r\n                else\r\n                    target[p] = prefix + (+startingNum + diff * progress).toString() + unit;\r\n                break;\r\n            }\r\n            case 'object': {\r\n                updateTarget(target[p], starting[p], props[p], progress, options);\r\n                break;\r\n            }\r\n        }\r\n    }\r\n};\r\nconst getCurrentProps = (target, props) => {\r\n    let values = Object.assign({}, props);\r\n    const rec = (_target, _props, _values) => {\r\n        for (let p in props) {\r\n            if (typeof (_props[p]) == 'object') {\r\n                rec(_target[p], props[p], _values[p]);\r\n            }\r\n            else {\r\n                _values[p] = _target[p];\r\n            }\r\n        }\r\n    };\r\n    rec(target, props, values);\r\n    return values;\r\n};\r\nconst addAnim = (target, props, seconds, options) => {\r\n    currentAnimations.forEach((anim) => {\r\n        if (target === anim.target)\r\n            overrideAnim(target, anim.props, props, options || {});\r\n    });\r\n    if (options === null || options === void 0 ? void 0 : options.getComputedStyle)\r\n        applyComputedStyle(target, props);\r\n    const starting = mapProps(target, props, options);\r\n    const anim = {\r\n        target,\r\n        props,\r\n        starting,\r\n        time: seconds * 1000,\r\n        currentTime: 0,\r\n        lastframetime: Date.now(),\r\n        progress: 0,\r\n        options: Object.assign(Object.assign({}, options), { curve: (options === null || options === void 0 ? void 0 : options.curve) ? options.curve : (x) => x })\r\n    };\r\n    currentAnimations.push(anim);\r\n    if (!active)\r\n        _animate();\r\n};\r\nconst overrideAnim = (target, existingAnimProps, newAnimProps, options) => {\r\n    for (let p in newAnimProps) {\r\n        if (!Object.keys(existingAnimProps).includes(p))\r\n            continue;\r\n        if (typeof (existingAnimProps[p]) == 'object') {\r\n            overrideAnim(target, existingAnimProps[p], newAnimProps[p]);\r\n        }\r\n        else {\r\n            if (options === null || options === void 0 ? void 0 : options.additive)\r\n                newAnimProps[p] = addString(newAnimProps[p], existingAnimProps[p]);\r\n            delete existingAnimProps[p];\r\n        }\r\n    }\r\n};\r\nconst getMsSinceLastFrame = (obj) => {\r\n    let frametime = Date.now();\r\n    const diff = frametime - obj.lastframetime;\r\n    obj.lastframetime = frametime;\r\n    return diff;\r\n};\r\nconst popAnim = (index) => {\r\n    currentAnimations.splice(index, 1);\r\n};\r\nconst _animate = () => {\r\n    active = true;\r\n    for (let i = 0; i < currentAnimations.length; i++) {\r\n        const deltatime = getMsSinceLastFrame(currentAnimations[i]);\r\n        currentAnimations[i].currentTime += deltatime;\r\n        currentAnimations[i].progress = currentAnimations[i].options.curve(currentAnimations[i].currentTime / currentAnimations[i].time);\r\n        updateTarget(currentAnimations[i].target, currentAnimations[i].starting, currentAnimations[i].props, currentAnimations[i].progress, currentAnimations[i].options);\r\n        currentAnimations[i].options.onUpdate && currentAnimations[i].options.onUpdate(currentAnimations[i].progress);\r\n        if (currentAnimations[i].currentTime >= currentAnimations[i].time) {\r\n            applyProps(currentAnimations[i].target, currentAnimations[i].props, currentAnimations[i].options);\r\n            currentAnimations[i].options.onComplete && currentAnimations[i].options.onComplete();\r\n            popAnim(i);\r\n            i--;\r\n        }\r\n    }\r\n    ;\r\n    if (currentAnimations.length > 0)\r\n        return requestAnimationFrame(_animate);\r\n    active = false;\r\n};\r\nexports.animate = addAnim;\r\n\n\n//# sourceURL=webpack://portfolio2/./src/anim/index.ts?");

/***/ }),

/***/ "./src/animationPlayer/index.ts":
/*!**************************************!*\
  !*** ./src/animationPlayer/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.anim8 = exports.createAnimationPlayer = void 0;\r\nconst anim_1 = __webpack_require__(/*! ../anim */ \"./src/anim/index.ts\");\r\nconst solveColor = (start, end, progress) => {\r\n    if (progress <= 0) {\r\n        return start;\r\n    }\r\n    else if (progress >= 1) {\r\n        return end;\r\n    }\r\n    else {\r\n        return (0, anim_1.interpolateColor)(start, end, progress);\r\n    }\r\n};\r\nconst solveProps = (start, end, progress) => {\r\n    let values = {};\r\n    for (let p in start) {\r\n        switch (typeof (start[p])) {\r\n            case 'object': {\r\n                values[p] = solveProps(start[p], end[p], progress);\r\n                break;\r\n            }\r\n            case 'string': {\r\n                if ((0, anim_1.isColor)(start[p]) && (0, anim_1.isColor)(end[p])) {\r\n                    if (progress <= 0) {\r\n                        values[p] = start[p];\r\n                    }\r\n                    else if (progress >= 1) {\r\n                        values[p] = end[p];\r\n                    }\r\n                    else {\r\n                        values[p] = solveColor(start[p], end[p], progress);\r\n                    }\r\n                    break;\r\n                }\r\n                const [prefix, startval, unit] = (0, anim_1.separateString)(start[p]);\r\n                const [, endval] = (0, anim_1.separateString)(end[p]);\r\n                if (progress <= 0) {\r\n                    values[p] = prefix + startval + unit;\r\n                }\r\n                else if (progress >= 1) {\r\n                    values[p] = prefix + endval + unit;\r\n                }\r\n                else {\r\n                    values[p] = prefix + (+startval + (+endval - +startval) * progress).toString() + unit;\r\n                }\r\n                break;\r\n            }\r\n            case 'number': {\r\n                if (progress <= 0) {\r\n                    values[p] = start;\r\n                }\r\n                else if (progress >= 1) {\r\n                    values[p] = end;\r\n                }\r\n                else {\r\n                    values[p] = start[p] + ((end[p] - start[p]) * progress);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    return values;\r\n};\r\nconst normalize = (start, end, x) => {\r\n    const total = end - start;\r\n    const displacement = x - start;\r\n    return displacement / total;\r\n};\r\nconst passedThreshold = (threshold, current, last) => {\r\n    return (current >= threshold && last < threshold || current <= threshold && last >= threshold);\r\n};\r\nconst validateValues = (target, anim, progress) => {\r\n    const { start, end, startProps, endProps, options } = anim;\r\n    try {\r\n        for (let p in startProps) {\r\n            switch (typeof (startProps[p])) {\r\n                case 'object': {\r\n                    validateValues(target[p], { start, end, startProps: startProps[p], endProps: endProps[p], options }, progress);\r\n                    break;\r\n                }\r\n                case 'number': {\r\n                    if (Number.isNaN(target[p]) || target[p] == undefined) {\r\n                        if (options === null || options === void 0 ? void 0 : options.useSetAttribute)\r\n                            target.setAttribute(p, 0);\r\n                        else\r\n                            target[p] = 0;\r\n                        console.log(`unset property ${p}, defaulting to 0`, target);\r\n                    }\r\n                }\r\n                case 'string': {\r\n                    if ((0, anim_1.isColor)(endProps[p])) {\r\n                        if (!(0, anim_1.isColor)(target[p])) {\r\n                            if (options === null || options === void 0 ? void 0 : options.useSetAttribute)\r\n                                target.setAttribute(p, 'rgb(0, 0, 0, 0)');\r\n                            else\r\n                                target[p] = 'rgb(0, 0, 0, 0)';\r\n                            console.log(`unset property ${p}, defaulting to rgb(0, 0, 0, 0)`, target);\r\n                        }\r\n                        break;\r\n                    }\r\n                    if (Number.isNaN(+target[p])) {\r\n                        if (options === null || options === void 0 ? void 0 : options.useSetAttribute)\r\n                            target.setAttribute(p, '0');\r\n                        else\r\n                            target[p] = '0';\r\n                        console.log(`unset property ${p}, defaulting to 0`, target);\r\n                    }\r\n                    break;\r\n                }\r\n            }\r\n        }\r\n    }\r\n    catch (err) {\r\n        console.log(err.message);\r\n        return false;\r\n    }\r\n    return true;\r\n};\r\nconst animationIsRunning = (anim, progress) => progress >= anim.start && progress <= anim.end;\r\nconst stripConflicts = (anim, animations, progress, animIndex) => {\r\n    if (animationIsRunning(anim, progress)) {\r\n        return anim;\r\n    }\r\n    let animCopy = JSON.parse(JSON.stringify(anim));\r\n    const generateObject = (a, b) => {\r\n        for (let p in a) {\r\n            if (Object.keys(b).includes(p)) {\r\n                if (typeof (a[p]) == 'object' && typeof (b[p]) == 'object') {\r\n                    generateObject(a[p], b[p]);\r\n                }\r\n                else {\r\n                    delete a[p];\r\n                }\r\n            }\r\n        }\r\n    };\r\n    animations.forEach((comparedAnimation, i) => {\r\n        if (!animationIsRunning(comparedAnimation, progress) || animIndex == i)\r\n            return;\r\n        generateObject(animCopy.startProps, comparedAnimation.startProps);\r\n        generateObject(animCopy.endProps, comparedAnimation.endProps);\r\n    });\r\n    return animCopy;\r\n};\r\nconst createAnimationPlayer = (properties, progressGetter) => {\r\n    let playerProps = properties;\r\n    let firstRun = true;\r\n    let currentProgress = progressGetter();\r\n    playerProps.targetList.forEach((props) => {\r\n        props.animations.forEach(anim => {\r\n            (Array.isArray(props.target) ? props.target : [props.target]).forEach(t => {\r\n                validateValues(t, anim, currentProgress);\r\n                console.log(anim.start, anim.end, currentProgress);\r\n                if (animationIsRunning(anim, currentProgress)) {\r\n                    const animProgress = normalize(anim.start, anim.end, currentProgress);\r\n                    const props = solveProps(anim.startProps, anim.endProps, !anim.curve ? animProgress : anim.curve(animProgress));\r\n                    (0, anim_1.animate)(t, props, anim.seconds || 0.4, anim.options);\r\n                }\r\n            });\r\n        });\r\n    });\r\n    const update = () => {\r\n        const lastFrame = currentProgress;\r\n        if (currentProgress != progressGetter() || firstRun) {\r\n            currentProgress = progressGetter();\r\n            playerProps.targetList.forEach(({ target, animations }) => {\r\n                animations.filter((anim) => animationIsRunning(anim, currentProgress) || passedThreshold(anim.start, currentProgress, lastFrame) || passedThreshold(anim.end, currentProgress, lastFrame))\r\n                    .map((anim, i) => stripConflicts(anim, animations, currentProgress, i))\r\n                    .forEach((anim, i) => {\r\n                    const animProgress = normalize(anim.start, anim.end, currentProgress);\r\n                    const props = solveProps(anim.startProps, anim.endProps, !anim.curve ? animProgress : anim.curve(animProgress));\r\n                    (Array.isArray(target) ? target : [target]).forEach(t => (0, anim_1.animate)(t, props, anim.seconds || 0.4, anim.options));\r\n                });\r\n            });\r\n        }\r\n        requestAnimationFrame(update);\r\n    };\r\n    update();\r\n    firstRun = false;\r\n};\r\nexports.createAnimationPlayer = createAnimationPlayer;\r\nexports.anim8 = anim_1.animate;\r\n\n\n//# sourceURL=webpack://portfolio2/./src/animationPlayer/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst animationPlayer_1 = __webpack_require__(/*! ./animationPlayer */ \"./src/animationPlayer/index.ts\");\r\nconst static_1 = __webpack_require__(/*! ./static */ \"./src/static.ts\");\r\nconst $ = (str) => document.querySelector(str);\r\nconst $_ = (str) => document.querySelectorAll(str);\r\nlet scrollPos = 0;\r\nlet MAX_SCROLL = 0;\r\nlet restoreScrollTimeout;\r\nlet currentSlide = 0;\r\nconst scrollHandler = (delta) => {\r\n    if (scrollPos <= 0 && delta < 0)\r\n        return false;\r\n    if (scrollPos >= MAX_SCROLL - 1 && delta > 0)\r\n        return false;\r\n    scrollPos += delta / 100;\r\n    return true;\r\n};\r\nconst viewportHeight = () => window.innerHeight;\r\nconst appendSlides = () => {\r\n    static_1.slides.forEach((slide, i) => {\r\n        MAX_SCROLL++;\r\n        const slideElement = document.createElement('div');\r\n        slideElement.id = `slide_${i}`;\r\n        slideElement.classList.add('slide');\r\n        slideElement.innerHTML = slide.html;\r\n        slideElement.style.zIndex = `${static_1.slides.length - i}`;\r\n        slideElement.style.bottom = `0px`;\r\n        $('.main').appendChild(slideElement);\r\n    });\r\n};\r\nlet sections = [];\r\nconst createNav = () => {\r\n    sections = static_1.slides.map((slide, i) => (Object.assign(Object.assign({}, slide), { number: i }))).filter(slide => slide.page.startsWith('!'));\r\n    const nav = document.createElement('nav');\r\n    nav.classList.add('nav');\r\n    document.body.appendChild(nav);\r\n    nav.innerHTML = `\r\n    ${sections.map((section) => `<p class=\"navText\">${section.page.replace('!', '')}</p>`).join('')}\r\n  `;\r\n    $_('.navText').forEach((navText, i) => {\r\n        navText.addEventListener('click', () => {\r\n            scrollToSlide(sections[i].number);\r\n        });\r\n    });\r\n};\r\nconst activeSlideNumber = (slideNumber) => {\r\n    if (slideNumber >= sections[sections.length - 1].number) {\r\n        return sections[sections.length - 1].number;\r\n    }\r\n    for (let i = 0; i < sections.length; i++) {\r\n        if (slideNumber >= sections[i].number && slideNumber < sections[i + 1].number)\r\n            return sections[i].number;\r\n    }\r\n    return -1;\r\n};\r\nlet lastActiveNav;\r\nconst updateNav = (slideNumber) => {\r\n    var _a;\r\n    const activeNav = activeSlideNumber(slideNumber);\r\n    if (lastActiveNav == activeNav)\r\n        return;\r\n    (_a = $('.activeNav')) === null || _a === void 0 ? void 0 : _a.classList.remove('activeNav');\r\n    console.log($_('.navText'), sections.findIndex(({ number }) => number == activeNav));\r\n    $_('.navText')[sections.findIndex(({ number }) => number == activeNav)].classList.add('activeNav');\r\n    lastActiveNav = activeNav;\r\n};\r\nconst scrollToSlide = (slideNumber) => {\r\n    updateNav(slideNumber);\r\n    currentSlide = slideNumber;\r\n    scrollPos = slideNumber;\r\n    $_('.slide').forEach((slide, i) => {\r\n        if (slideNumber > i)\r\n            (0, animationPlayer_1.anim8)(slide.style, { bottom: `${viewportHeight()}px` }, 0.5, { curve: Math.sqrt });\r\n        if (slideNumber <= i)\r\n            (0, animationPlayer_1.anim8)(slide.style, { bottom: `0px` }, 0.5, { curve: Math.sqrt });\r\n    });\r\n};\r\nconst touchToSlide = (slideNumber) => {\r\n    const slide = $(`#slide_${slideNumber}`);\r\n    (0, animationPlayer_1.anim8)(slide.style, { bottom: `0px` }, 0.5, { curve: Math.sqrt });\r\n};\r\nlet lastY = 0;\r\nlet startY = 0;\r\nlet slide = undefined;\r\nlet delta = 0;\r\nif (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {\r\n    window.addEventListener('touchstart', e => {\r\n        startY = viewportHeight() - e.touches[0].clientY;\r\n        console.log(startY, e.touches[0].clientY);\r\n    });\r\n    window.addEventListener('touchmove', e => {\r\n        if (scrollPos < 0) {\r\n            scrollPos = 0;\r\n            return;\r\n        }\r\n        delta = (viewportHeight() - e.touches[0].clientY) - startY;\r\n        if ((delta < 0 && currentSlide == 0))\r\n            return;\r\n        if (!slide)\r\n            slide = delta > 0 ? $(`#slide_${currentSlide}`) : $(`#slide_${currentSlide - 1}`);\r\n        (0, animationPlayer_1.anim8)(slide.style, { bottom: `${(delta > 0 ? delta : viewportHeight() + delta)}px` }, 0.5, { curve: Math.sqrt });\r\n        lastY = (delta > 0 ? delta : viewportHeight() + delta);\r\n    });\r\n    window.addEventListener('touchend', (e) => {\r\n        console.log(startY, lastY, delta);\r\n        scrollPos = Math.round(scrollPos);\r\n        if (lastY > viewportHeight() / 2 && delta > 0) {\r\n            scrollToSlide(currentSlide + 1);\r\n        }\r\n        else if (lastY < viewportHeight() / 2 && delta < 0) {\r\n            scrollToSlide(currentSlide - 1);\r\n        }\r\n        else {\r\n            scrollToSlide(currentSlide);\r\n        }\r\n        slide = undefined;\r\n    });\r\n}\r\nelse {\r\n    window.addEventListener('wheel', (e) => {\r\n        if (scrollHandler(e.deltaY))\r\n            scrollToSlide(scrollPos);\r\n    });\r\n}\r\nconst targetList = [];\r\nlet contentfulNodes = [];\r\nfetch('https://cdn.contentful.com/spaces/palvxtju5t28/environments/master/entries?content_type=project&access_token=c9Y83nhE7NUFufpeoBfY5aw3a62eChJyq2Auz1UEAxM').then(res => res.json()).then((res) => {\r\n    static_1.slides.splice(static_1.slides.findIndex(({ page }) => page == '!Projects') + 1, 0, ...res.items.map(({ fields }, i) => ({ page: `projects_${i}`, html: `\r\n    <div class=\"project\">\r\n      <div class=\"project_title\">\r\n        <h2>${fields.title}</h2>\r\n      </div>\r\n      ${fields.description}\r\n    </div>` })));\r\n    appendSlides();\r\n    createNav();\r\n});\r\n\n\n//# sourceURL=webpack://portfolio2/./src/index.ts?");

/***/ }),

/***/ "./src/static.ts":
/*!***********************!*\
  !*** ./src/static.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.slides = void 0;\r\nexports.slides = [{\r\n        page: '!Welcome',\r\n        html: `\r\n  <h1 class=\"slideH1\">ALEXANDER LINDSTRÖM</h1>\r\n  <h2 class=\"slideH2\">FULL STACK/BACK END DEVELOPER</h2>\r\n  <h3 class=\"slideH3\" style=\"bottom: 0px;\">SCROLL DOWN</h3>`\r\n    },\r\n    {\r\n        page: '!Projects',\r\n        html: `\r\n  <h1 class=\"slideH1\">Projects</h1>\r\n  <div id=\"projects\"></div>`\r\n    },\r\n    {\r\n        page: '!Contact',\r\n        html: `\r\n    <h1 class=\"slideH1\">Contact:</h1>\r\n    <div id=\"contact\">\r\n    <a class=\"link\" href=\"mailto:alexanderlhlindstrom@gmail.com\">alexanderlhlindstrom@gmail.com</a>\r\n    </div>`\r\n    }];\r\n\n\n//# sourceURL=webpack://portfolio2/./src/static.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;