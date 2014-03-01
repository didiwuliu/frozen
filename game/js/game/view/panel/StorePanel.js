/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午4:43
 * To change this template use File | Settings | File Templates.
 */
function StorePanel(currenPage){
    CommonSubPanel.call(this);
    if((typeof currenPage) == "number" ){
        this.currentPage = currenPage;
    }else{
        this.currentPage = 0;
    }
    this.init();
    this.initContent();
    this.setCurrentPage(this.currentPage);

    this.addEventListener(LMouseEvent.MOUSE_DOWN,this.onScrollDown,this);
}
StorePanel.prototype = Object.create(CommonSubPanel.prototype);
StorePanel.prototype.onScrollDown = function(event){
    this.addEventListener(LMouseEvent.MOUSE_MOVE,this.onScrollMove,this);
    this.addEventListener(LMouseEvent.MOUSE_UP,this.onScrollUp,this);
    this.startPoint = {x:event.x,y:event.y};
}
StorePanel.prototype.onScrollUp = function(event){
//    this.move = false;
    this.removeEventListener(LMouseEvent.MOUSE_MOVE,this.onScrollMove);
    this.removeEventListener(LMouseEvent.MOUSE_UP,this.onScrollUp);

    var itemContainer = this.pages[this.currentPage];
    itemContainer.y = -(itemContainer.itemHeight+10)*itemContainer.startIndex;
    delete this.startPoint;
}
StorePanel.prototype.onScrollMove = function(event){
    if(!this.startPoint)return;
//    this.move = true;
    var itemContainer = this.pages[this.currentPage];
    var ty = event.y - this.startPoint.y;
    itemContainer.y += ty;
    if(itemContainer.y>0){
        itemContainer.y = 0;
    }else if(itemContainer.y < -((itemContainer.itemHeight+10)*(itemContainer.items.length - itemContainer.showLength+1))){
        itemContainer.y = -((itemContainer.itemHeight+10)*(itemContainer.items.length - itemContainer.showLength+1));
    }
    this.startPoint = {x:event.x,y:event.y};

    var si = ~~Math.abs(itemContainer.y/itemContainer.itemHeight);
    itemContainer.showItemFrom(si);
}

StorePanel.prototype.initContent = function(){
    //shop文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.store_f)
    var bp = new LBitmap(bpd,"store_f");
    bp.setCP(294,72);
    this.addChild(bp);

    this.addChild(gameUI.getCoinsInfoComponent());
    //黑色背景框
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.message_bg);
    var bp = new L9ScaleBitmap(bpd,14,14,456-28,466-28);
    bp.y = 225;
    bp.x = 66;
    this.addChild(bp);
    //第几页的标记，红色点点

    this.listContainer = new LSprite();
    this.listContainer.viewPort = new LRectangle(0,0,450,445);
    this.listContainer.x = 76;
    this.listContainer.y = 239;
    this.addChild(this.listContainer);
    //itemsList
    this.itemsData = util.clone(gameConfig.items);
    this.ItemsGoods = new ItemsContainer(this.itemsData,CakeItemRender,7,66,203,436);
    this.ItemsGoods.initializeItem();
    this.ItemsGoods.showItemFrom(0);
//    this.ItemsGoods.x = 22;
    this.listContainer.addChild( this.ItemsGoods);
    this.ItemsGoods.visible = false;
    //specialsList
    this.specialsData = gameConfig.specials;
    this.specialsGoods = new ItemsContainer(this.specialsData,SpecialItemRender,7,66,94,436);
    this.specialsGoods.initializeItem();
    this.specialsGoods.showItemFrom(0);
//    this.specialsGoods.x = 22;
    this.listContainer.addChild( this.specialsGoods);
    this.specialsGoods.visible = false;
    //coinsList
    this.coinsData = gameConfig.coins;
    this.coinsGoods = new ItemsContainer(this.coinsData,CoinsItemRender,7,66,470,436);
    this.coinsGoods.initializeItem();
    this.coinsGoods.showItemFrom(0);
//    this.coinsGoods.x = 22;
    this.listContainer.addChild( this.coinsGoods);
    //title
    this.title = new StorePageTitle();
    this.title.x = 41;this.title.y = 147;
    this.addChild(this.title);
    //翻页按钮
    this.leftBtn = new PageBtnLeft();
    this.addChild(this.leftBtn);
    this.leftBtn.x = 47;this.leftBtn.y = 710;
    this.leftBtn.addEventListener(LMouseEvent.MOUSE_DOWN,function(event){
        if(runtimeData.currentMode == "mode5" && !tutorialManager.finished){
            return
        }
        if(this.currentPage > 0)
        {
            this.currentPage -= 1;
            this.setCurrentPage(this.currentPage);
        };
    },this);

    this.rightBtn = new PageBtnRight();
    this.rightBtn.x = 479;this.rightBtn.y = 708;
    this.addChild(this.rightBtn);
    this.rightBtn.addEventListener(LMouseEvent.MOUSE_DOWN,function(event)
    {
        if(runtimeData.currentMode == "mode5" && !tutorialManager.finished){
            return;
        }
        if(this.currentPage <2)
        {
            this.currentPage +=1;
            this.setCurrentPage(this.currentPage);
        };
    },this);

    this.pages = [this.ItemsGoods,this.specialsGoods,this.coinsGoods];

    //翻页点
    this.pageNumberPoints = new PageNumber(3);
    this.pageNumberPoints.setCurrentPage(0);
    this.pageNumberPoints.x = 261;
    this.pageNumberPoints.y = 740;
    this.addChild(this.pageNumberPoints);
};
StorePanel.prototype.setCurrentPage = function(currentPage){
    this.currentPage = currentPage;
    //选择list
    for(var i =0;i<this.pages.length;i++){
        if(i == currentPage){
            this.pages[i].visible = true
        }else
        {
            this.pages[i].visible = false;
        };
    }
    //选择title
    this.title.setCurrentPage(currentPage);
    //选择pageBtn
    if(currentPage == 0){
        this.leftBtn.setEnable(false);
        this.rightBtn.setEnable(true);
    }else if(currentPage == 1){
        this.leftBtn.setEnable(true);
        this.rightBtn.setEnable(true);
    }else if(currentPage == 2){
        this.leftBtn.setEnable(true);
        this.rightBtn.setEnable(false);
    }
    //翻页点
    this.pageNumberPoints.setCurrentPage(currentPage);
}
StorePanel.prototype.initialPrice = function(){
    store.start();
    var products = CocoonJS.Store.getProducts();

    if(products){
        console.log("Store.getProducts获得产品数量："+products.length);
        if(products && products.length <= 0){
            store.fetchProductsFromServer(gameConfig.products);
            return;
        }
    } else{
        store.fetchProductsFromServer(gameConfig.products);
        return;
    }
    var data = {};
    for(var key in products){
        util.printObject(products[key]);
        var productId = products[key].productId;
        data[productId] = products[key].localizedPrice;
    }

    var items = this.coinsGoods.items;
    for(var key in items){
        var item = items[key];
        item.setPrice(data[item.data.productId]);
    }

    var items = this.specialsGoods.items;
    for(var key in items){
        var item = items[key];
        if(item.data.productId){
            item.setPrice(data[item.data.productId]);
        }
    }

}
StorePanel.prototype.onBack = function(event){
    if(event)
        event.stopGoOn = true;

    //forceBack,强制商店返回。使runtimeData.currentMode 和 tutorialManager.finished无效
    if(runtimeData.currentMode == "mode5" && !tutorialManager.finished){
        return;
    }

    soundManager.play("cancel_back");
    visibleManager.hidePanel("store");
    visibleManager.gotoPreviousView();
    //从assistantPanel进入store，进入商店后，设置了gameUI.assistantPanel.isMouseEnable = false;
    if(gameUI.assistantPanel){
        gameUI.assistantPanel.isMouseEnable = true;
        //退出商店，会调用visibleManager.gotoGame(true)，所以。。。。。;
        visibleManager.gotoMode(false);
    }
}