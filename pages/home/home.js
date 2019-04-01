var app = getApp ();
var network = require ( "../../utils/network.js" );
var url = app.globalData.url;
var shopId = app.globalData.shopId;
var imgUrl = app.globalData.imgUrl;
var imgUrl2 = app.globalData.imgUrl2;

Page ( {
    data: {
        imgUrl: imgUrl,
        imgUrl2: imgUrl2,
        imgUrls: [],
        nav: '0',//菜单栏选择
        flag: false,//是否显示顶部效果
        pageNum: 1,//文章列表请求页数
        noMore: false,//是否还有更多
        id: '',//文章id
        navigationList: [
            { name: '推荐' },
            { name: '智能生活' },
            { name: '新媒体' },
            { name: '新零售' },
            { name: '社群' },
            { name: '乱七八糟' }
        ],
        indexlist: [],
        passageList: [],
        actList: [],
        activity: [],
        read: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 500,
        userInfo: {},
        articleType: '',
        history: [],
        findText: '',
    },
    onLoad: function () {
        var that = this;
        //获取推荐
        wx.setNavigationBarTitle ( {
            title: '梧桐商城'//页面标题为路由参数
        } );
        //文章分类请求
        network.requestLoading ( 'articles/type',
            '',
            'GET',
            '',
            function ( res ) {
                that.setData ( {
                    navigationList: res.datas
                } );
            }, function () {
                wx.showToast ( {
                    image: '../../lib/image/jg.png',
                    title: '加载数据失败',
                } );
            } );
        //热门文章请求
        network.requestLoading ( 'articles/hot',
            '',
            'GET',
            '正在加载',
            function ( res ) {
                that.setData ( {
                    passageList: res.datas.datas
                } );
            }, function () {
                wx.showToast ( {
                    image: '../../lib/image/jg.png',
                    title: '加载数据失败',
                } );
            } );
        //推荐专题请求
        network.requestLoading ( 'articles/hot',
            '',
            'GET',
            '正在加载',
            function ( res ) {
                that.setData ( {
                    actList: res.datas
                } );
            }, function () {
                wx.showToast ( {
                    image: '../../lib/image/jg.png',
                    title: '加载数据失败',
                } );
            } );
        //文章列表请求
        network.requestLoading ( 'articles',
            {
                queryType: 1,
                pageNo: that.data.pageNum,
                pageSize: 10
            },
            'GET',
            '正在加载',
            function ( res ) {
                var reads = res.datas.datas;
                for (var i = 0; i < reads.length; i++) {
                    reads[ i ].createDate = network.formatTime ( reads[ i ].createDate / 1000, 'Y/M/D' );
                }
                that.setData ( {
                    read: that.data.read.concat ( reads )
                } );
            }, function () {
                wx.showToast ( {
                    image: '../../lib/image/jg.png',
                    title: '加载数据失败',
                } );
            } );
        //发起轮播图请求
        network.requestLoading ( 'banners?type=0',
            '',
            'GET',
            '',
            function ( res ) {
                that.setData ( {
                    imgUrls: res.datas
                } );
            }, function ( res ) {
                wx.showToast ( {
                    title: '加载数据失败',
                } );
            } );
    },
    //外链跳转
    copyAdd: function ( event ) {
        var that = this;
        var url = event.currentTarget.dataset.url;
        wx.showModal ( {
            title: '提示',
            confirmText: '复制',
            content: '小程序暂不支持跳转此链接，请点击复制后在微信聊天界面发送查看',
            success: function ( res ) {
                if (res.confirm) {
                    wx.setClipboardData ( {
                        data: url,
                        success: function ( res ) {
                            wx.getClipboardData ( {
                                success: function ( res ) {
                                    // console.log(res.data) // data
                                }
                            } );
                        }
                    } );
                } else {
                    //取消操作
                }

            }
        } );
    },
    /* 下拉刷新 */
    onPullDownRefresh: function () {
        // var that = this;
        // wx.showNavigationBarLoading() //在标题栏中显示加载
        // that.setData({
        //   pageNum: 1
        // })
        // that.article()
    },
    //触底
    onReachBottom: function ( res ) {
        var that = this;
        var index = that.data.nav;
        if (index == 0) {//推荐
            that.setData ( {
                pageNum: that.data.pageNum + 1
            } );
            that.article ();
        } else if (index == 1) {//智能生活
            that.setData ( {
                pageNum: that.data.pageNum + 1
            } );
            that.article ();
        }
    },
    //点击顶部菜单栏
    navBtn: function ( event ) {
        var i = event.currentTarget.dataset.index;
        var typeId = event.currentTarget.dataset.id;
        if (typeId == null) {
            typeId = '';
        }
        var that = this;
        that.setData ( {
            nav: i,
            articleType: typeId,
            read: [],
            noMore: false,
            pageNum: 1
        } );
        var that = this;
        // that.data.noMore = false;
        // that.data.read = []
        // that.data.pageNum = 1;
        that.article ();
    },
    //文章列表样式公共请求
    article: function () {
        var that = this;
        network.requestLoading ( 'articles?queryType=1&pageNo=' + that.data.pageNum + '&pageSize=10&articleType=' + that.data.articleType,
            '',
            'GET',
            '正在加载更多...',
            function ( res ) {
                var reads = res.datas.datas;
                if (reads.length == 0) {
                    wx.showToast ( {
                        image: '../../lib/image/jg.png',
                        title: '暂无更多',
                    } );
                    that.setData ( {
                        noMore: true
                    } );
                } else {
                    for (var i = 0; i < reads.length; i++) {
                        reads[ i ].createDate = network.formatTime ( reads[ i ].createDate / 1000, 'Y/M/D' );
                    }
                    that.setData ( {
                        read: that.data.read.concat ( reads ),
                        noMore: false
                    } );
                }
            }, function () {
                wx.showToast ( {
                    image: '../../lib/image/jg.png',
                    title: '加载数据失败',
                } );
            } );
    },
    //打开文章页面
    artPage: function ( event ) {
        var id = event.currentTarget.dataset.id;
        wx.navigateTo ( { url: '/pages/acticle/acticle?id=' + id } );
    },
    moreAr: function ( event ) {
        wx.navigateTo ( { url: '/pages/hotarticle/hotarticle' } );
    },
    //搜索
    findBtn: function ( e ) {
        var that = this;
        if (e.detail.value != '') {
            wx.getStorage ( {
                key: 'history',
                success: function ( res ) {
                    that.setData ( {
                        history: res.data
                    } );
                    let arr = that.data.history;
                    var pushArr = true;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[ i ] == e.detail.value) {
                            pushArr = false;
                            break;
                        } else {
                            pushArr = true;
                        }
                    }
                    if (pushArr) {
                        arr.push ( e.detail.value );
                    }
                    wx.setStorage ( {
                        key: 'history',
                        data: arr,
                        success: function ( res ) {
                            that.setData ( {
                                findText: ''
                            } );
                            wx.navigateTo ( { url: '/pages/findPage/findPage?findText=' + e.detail.value } );
                        }
                    } );
                },
                fail: function ( res ) {
                    that.setData ( {
                        history: ''
                    } );
                    let arr = [];
                    arr.push ( e.detail.value );
                    wx.setStorage ( {
                        key: 'history',
                        data: arr,
                        success: function ( res ) {
                            that.setData ( {
                                findText: ''
                            } );
                            wx.navigateTo ( { url: '/pages/findPage/findPage?findText=' + e.detail.value } );
                        }
                    } );
                }
            } );
        } else {
            wx.showToast ( {
                title: '请输入搜索内容',
                icon: 'loading',
                duration: 2000
            } );
        }
    }
} );
