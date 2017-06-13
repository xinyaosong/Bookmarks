
if (window.localStorage){

    function getBookmarks(){
        const bookmarksList = [];
        const currbookmarks = localStorage.getItem('bookmarks');

        // localStorage 格式 bookmarks： << src1 || url1 $$ title1 >> << src2 || url2 $$ ...
        if (currbookmarks){
            currbookmarks.split('>>').forEach(function(element){      
                if (element.length > 0){    
                    const arr = element.split('||');
                    bookmarksList.push({ src: arr[0], url: arr[1], title: arr[2] });
                }
            })
        }
        return bookmarksList;
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){   
        const preBookmarks = localStorage.getItem('bookmarks') 
                            ? localStorage.getItem('bookmarks')
                            : '';
    
        // localStorage 格式 bookmarks： << src1 || url1 $$ title1 >> << src2 || url2 $$ ...
        const bookmarks = preBookmarks 
                        + request.src + '||'
                        + request.tab.url + '||'
                        + request.tab.title + '>>';

        localStorage.setItem('bookmarks', bookmarks);
        const bookmarksList = getBookmarks();
        vm.bookmarks = bookmarksList;
    })

    var vm = new Vue({
        el: '#container',
        data: {
            bookmarks: getBookmarks()
        },
        methods: {
            removeStorage: function(){
                console.log(11)
                localStorage.removeItem('bookmarks');
                this.bookmarks = [];
            }
        }
    });
    
}else{
    alert('error: sorry, you dont have local storage')
}


