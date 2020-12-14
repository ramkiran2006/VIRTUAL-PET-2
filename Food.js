class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
        this.foodStock=0;
        this.lastFed;
        this.foodObj;
    }
 
    getFoodStock(){
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value",function(data){
        foodStock = data.val();
         })
    }

    update(stock){
        database.ref('/').update({
          foodStock: stock
        });
      }

      deductFood(){
        if(this.foodStock>0){
         this.foodStock=this.foodStock-1;
        }
       }

       display(){
         var x = 80, y=100;

         imageMode(CENTER);
         image(this.image,720,220,70,70);

         if(this.foodStock!=0){
           for(var i=0; i < this.foodStock; i++){
             if(i%10==0){
              x = 80;
              y = y+50;
             }
             image(this.image,x,y,50,50);
             x = x+30;
           }
         }
       }

}
