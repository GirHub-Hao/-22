let product = (function () {
    let data = null;
    let row = document.querySelector(".row");//获取row，插入内容
    let lis = Array.from(document.querySelectorAll(".navbar-nav li"));
    
    //发送ajax获取数据
    const getData = function getData() {
        //建立一个核心对象
        let xhr = new XMLHttpRequest;
        //建立连接
        xhr.open("get", "product.json", false);
        //注册监听
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {

                data = JSON.parse(xhr.response)
            }
        }
        //4.发送数据
        xhr.send();
    }

    //渲染页面
    const render = function render() {
        // console.log(data);
        let str = "";
        data.forEach(item => {
            let { id, title, price, time, hot, img } = item;
            str += `<div class="col-sm-6 col-md-3" item data-id="${id}">
        <div class="thumbnail">
          <img src="${img}" alt="...">
          <div class="caption">
            <h3>${title}</h3>
            <p>价格: ￥${price}</p>
            <p>时间: ${time}</p>
            <p>热度: ${hot}</p>
          </div>
        </div>
      </div>`;
        });
        row.innerHTML = str;//通过innerHTML给row添加内容
    }

    //功能部分
    const handle = function handle() {
        let flag=-1;//-1
		lis[0].onclick=function(){
			flag=flag*-1;//-1*-1=1  1*-1=-1
			data.sort(function(a,b){
				return (a.price-b.price)*flag;
				//(a.price-b.price)*1-->a.price-b.price
				//(a.price-b.price)*-1---》-a.price+b.price==>b.price-a.price
			})
			render();//重新渲染
		}

        let flagtime=-1;
		lis[1].onclick=function(){
			flagtime=flagtime*-1;
			data.sort(function(a,b){
				a=new Date(a.time).getTime();
				b=new Date(b.time).getTime();
				return (a-b)*flagtime;
			})
			render();//重新渲染
		}

        let flaghot=-1;//-1
		lis[2].onclick=function(){
			flaghot=flaghot*-1;//-1*-1=1  1*-1=-1
			data.sort(function(a,b){
				return (a.hot-b.hot)*flaghot;
				//(a.price-b.price)*1-->a.price-b.price
				//(a.price-b.price)*-1---》-a.price+b.price==>b.price-a.price
			})
			render();//重新渲染
		}
    }


    return {
        init() {
            getData();
            render();
            handle();
        }
    }
})();
product.init();