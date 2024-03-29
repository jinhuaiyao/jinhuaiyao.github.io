// Lazyload Start
(function () {
    function logElementEvent(eventName, element) {
        console.log(Date.now(), eventName, element.getAttribute("data-src"));
    }

    var callback_enter = function (element) {
        logElementEvent("🔑 ENTERED", element);
    };
    var callback_exit = function (element) {
        logElementEvent("🚪 EXITED", element);
    };
    var callback_loading = function (element) {
        logElementEvent("⌚ LOADING", element);
    };
    var callback_loaded = function (element) {
        logElementEvent("👍 LOADED", element);
    };
    var callback_error = function (element) {
        logElementEvent("💀 ERROR", element);
        element.src = "/assets/img/error.png";
    };
    var callback_finish = function () {
        logElementEvent("✔️ FINISHED", document.documentElement);
    };
    var callback_cancel = function (element) {
        logElementEvent("🔥 CANCEL", element);
    };

    var ll = new LazyLoad({
        class_applied: "lz-applied",
        class_loading: "lz-loading",
        class_loaded: "lz-loaded",
        class_error: "lz-error",
        class_entered: "lz-entered",
        class_exited: "lz-exited",
        // Assign the callbacks defined above
        callback_enter: callback_enter,
        callback_exit: callback_exit,
        callback_cancel: callback_cancel,
        callback_loading: callback_loading,
        callback_loaded: callback_loaded,
        callback_error: callback_error,
        callback_finish: callback_finish
    });
})();
// Lazyload End

// Memos Start
var memo = {
    host: 'https://demo.usememos.com/',
    limit: '10',
    creatorId: '101',
    domId: '#memos',
    username: '',
    name: ''
}
if (typeof (memos) !== "undefined") {
    for (var key in memos) {
        if (memos[key]) {
            memo[key] = memos[key];
        }
    }
}

var limit = memo.limit
var memos = memo.host.replace(/\/$/, '')
var memoUrl = memos + "/api/v1/memo?creatorId=" + memo.creatorId + "&rowStatus=NORMAL"
var page = 1,
    offset = 0,
    nextLength = 0,
    nextDom = '';
var tag='';
var btnRemove = 0
var memoDom = document.querySelector(memo.domId);
var load = '<button class="load-btn button-load">loading……</button>'
if (memoDom) {
    memoDom.insertAdjacentHTML('afterend', load);
    getFirstList() // 首次加载数据
    // 添加 button 事件监听器
    btnRemove = 0;
    var btn = document.querySelector("button.button-load");
    btn.addEventListener("click", function () {
        btn.textContent = 'loading……';
        updateHTMl(nextDom)
        if (nextLength < limit) { // 返回数据条数小于限制条数，隐藏
            document.querySelector("button.button-load").remove()
            btnRemove = 1
            return
        }
        getNextList()
    });
}

function getFirstList() {
    var memoUrl_first = memoUrl + "&limit=" + limit;
    fetch(memoUrl_first).then(res => res.json()).then(resdata => {
        updateHTMl(resdata)
        var nowLength = resdata.length
        if (nowLength < limit) { // 返回数据条数小于 limit 则直接移除“加载更多”按钮，中断预加载
            document.querySelector("button.button-load").remove()
            btnRemove = 1
            return
        }
        page++
        offset = limit * (page - 1)
        getNextList()
    });
}
// 预加载下一页数据
function getNextList() {
    if (tag){
        var memoUrl_next = memoUrl + "&limit=" + limit + "&offset=" + offset + "&tag=" + tag;
    } else {
        var memoUrl_next = memoUrl + "&limit=" + limit + "&offset=" + offset;
    }
    fetch(memoUrl_next).then(res => res.json()).then(resdata => {
        nextDom = resdata
        nextLength = nextDom.length
        page++
        offset = limit * (page - 1)
        if (nextLength < 1) { // 返回数据条数为 0 ，隐藏
            document.querySelector("button.button-load").remove()
            btnRemove = 1
            return
        }
    })
}

// 标签选择

document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName.toLowerCase() === 'a' && target.getAttribute('href').startsWith('#')) {    
        event.preventDefault();
        tag = target.getAttribute('href').substring(1); // 获取标签名
        if (btnRemove) {    // 如果 botton 被 remove
            btnRemove = 0;
            memoDom.insertAdjacentHTML('afterend', load);
            // 添加 button 事件监听器
            var btn = document.querySelector("button.button-load");
            btn.addEventListener("click", function () {
                btn.textContent = 'loading……';
                updateHTMl(nextDom)
                if (nextLength < limit) { // 返回数据条数小于限制条数，隐藏
                    document.querySelector("button.button-load").remove()
                    btnRemove = 1
                    return
                }
                getNextList()
            });
            
        }        
        getTagFirstList();
        var filterElem = document.getElementById('tag-filter');
        filterElem.style.display = 'block';    // 显示过滤器
        var tags = document.getElementById('tags');
        var tagresult = `Filter: <span class='tag-span'><a rel='noopener noreferrer' href=''>#${tag}</a></span>`
        tags.innerHTML = tagresult;
        scrollTo(0,0);    // 回到顶部
    }
});

function getTagFirstList() {
    page = 1;
    offset = 0;
    nextLength = 0;
    nextDom = '';
    memoDom.innerHTML = "";
    var memoUrl_tag = memoUrl + "&limit=" + limit + "&tag=" + tag;
    fetch(memoUrl_tag).then(res => res.json()).then(resdata => {
        updateHTMl(resdata);
        var nowLength = resdata.length
        if (nowLength < limit) { // 返回数据条数小于 limit 则直接移除“加载更多”按钮，中断预加载
            document.querySelector("button.button-load").remove()
            btnRemove = 1
            return
        }
        page++
        offset = limit * (page - 1)
        getNextList()
    });
}

// 标签选择 end

// 插入 html
function updateHTMl(data) {
    var memoResult = "", resultAll = "";

    // 解析 TAG 标签，添加样式
    const TAG_REG = /#([^\s#]+?) /g;

    // 解析 BiliBili
    const BILIBILI_REG = /<a\shref="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?">.*<\/a>/g;
    // 解析网易云音乐
    const NETEASE_MUSIC_REG = /<a\shref="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g;
    // 解析 QQ 音乐
    const QQMUSIC_REG = /<a\shref="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g;
    // 解析腾讯视频
    const QQVIDEO_REG = /<a\shref="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g;
    // 解析 Spotify
    const SPOTIFY_REG = /<a\shref="https:\/\/open\.spotify\.com\/(track|album)\/([\s\S]+)".*?>.*<\/a>/g;
    // 解析优酷视频
    const YOUKU_REG = /<a\shref="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g;
    //解析 Youtube
    const YOUTUBE_REG = /<a\shref="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;

    // Marked Options
    marked.setOptions({
        breaks: true,
        smartypants: true,
        langPrefix: 'language-',
        highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
    });

    // Memos Content
    for (var i = 0; i < data.length; i++) {
        var memoContREG = data[i].content
            .replace(TAG_REG, "<span class='tag-span'><a rel='noopener noreferrer' href='#$1'>#$1 </a></span>")

        // For CJK language users
        // 用 PanguJS 自动处理中英文混合排版
        // 在 index.html 引入 JS：<script type="text/javascript" src="assets/js/pangu.min.js?v=4.0.7"></script>
        // 把下面的 memoContREG = marked.parse(memoContREG) 改为：memoContREG = marked.parse(pangu.spacing(memoContREG))

        memoContREG = marked.parse(memoContREG)
            .replace(BILIBILI_REG, "<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true' style='position:absolute;height:100%;width:100%;'></iframe></div>")
            .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")
            .replace(NETEASE_MUSIC_REG, "<meting-js auto='https://music.163.com/#/song?id=$1'></meting-js>")
            .replace(QQMUSIC_REG, "<meting-js auto='https://y.qq.com/n/yqq/song$1.html'></meting-js>")
            .replace(QQVIDEO_REG, "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>")
            .replace(SPOTIFY_REG, "<div class='spotify-wrapper'><iframe style='border-radius:12px' src='https://open.spotify.com/embed/$1/$2?utm_source=generator&theme=0' width='100%' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe></div>")
            .replace(YOUKU_REG, "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>")
            .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")

        // 解析内置资源文件
        if (data[i].resourceList && data[i].resourceList.length > 0) {
            var resourceList = data[i].resourceList;
            var imgUrl = '', resUrl = '', resImgLength = 0;
            for (var j = 0; j < resourceList.length; j++) {
                var resType = resourceList[j].type.slice(0, 5);
                var resexlink = resourceList[j].externalLink;
                var resLink = ''
                if (resexlink) {
                    resLink = resexlink
                } else {
                    fileId = resourceList[j].publicId || resourceList[j].filename
                    resLink = memos+'/o/r/'+resourceList[j].id+'/'+fileId
                }
                if (resType == 'image') {
                    imgUrl += '<div class="resimg"><img loading="lazy" src="' + resLink + '"/></div>'
                    resImgLength = resImgLength + 1
                }
                if (resType !== 'image') {
                    resUrl += '<a target="_blank" rel="noreferrer" href="' + resLink + '">' + resourceList[j].filename + '</a>'
                }
            }
            if (imgUrl) {
                var resImgGrid = ""
                if (resImgLength !== 1) { var resImgGrid = "grid grid-" + resImgLength }
                memoContREG += '<div class="resource-wrapper "><div class="images-wrapper">' + imgUrl + '</div></div>'
            }
            if (resUrl) {
                memoContREG += '<div class="resource-wrapper "><p class="datasource">' + resUrl + '</p></div>'
            }
        }
        memoResult += `
        <div class="memos__meta">
        <small class="memos__date">${moment(data[i].createdTs * 1000).twitter()}</small>
        </div>
        <li class="timeline">
            <div class="memos__content">
                <div class="memos__text">
                    <div class="memos__userinfo">
                        <div>${memo.name}</div>
                        <div class="memos__id">${memo.username}</div>
                    </div>
                    <p>${memoContREG}</p>
                </div>
            </div>
        </li>`;
    


    }
    var memoBefore = '<ul class="">'
    var memoAfter = '</ul>'
    resultAll = memoBefore + memoResult + memoAfter
    memoDom.insertAdjacentHTML('beforeend', resultAll);

    document.querySelector('button.button-load').textContent = 'Load More...';
}
// Memos End

