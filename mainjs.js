const imageList = document.querySelector(".section_middle_items");
document.querySelector(".section_middle_items_showmore").addEventListener('click', scroll);
document.querySelector(".section_middle_items_showmore").addEventListener('click', setting);
document.querySelector(".footer_top_blogpost_input_subscribe").addEventListener('click', ()=>{
    document.querySelector("header").style.opacity= "0.15";
    document.querySelector("section").style.opacity= "0.15";
    document.querySelector("footer").style.opacity= "0.15";
    document.querySelector(".modal").style.display= "flex";
});
document.querySelector(".modal_okilovehodu").addEventListener('click', ()=>{
    document.querySelector("header").style.opacity= "1";
    document.querySelector("section").style.opacity= "1";
    document.querySelector("footer").style.opacity= "1";
    document.querySelector(".modal").style.display= "none";
});
let pageToFetch = 1;
let timer = null;

function setting() {
    
    document.querySelector(".section_middle_bottom").style.display= "none";
    document.querySelector(".section_bottom").style.display= "none";
    document.querySelector(".section_map").style.display= "none";
    document.querySelector(".footer_top").style.display= "none";
    
    const fb = document.querySelector(".footer_bottom");
    fb.style.position = "fixed";
    fb.style.bottom = "0px";
    fb.style.zindex = "998";
    fb.style.background = "white";

    document.querySelector(".margindiv").style.display= "block";
    
}

function scroll() {
    window.addEventListener("scroll", ()=>{
    // 스크롤이 상단으로부터 얼마나 이동했는지 알아야합니다. (뷰포트의 높이 + 스크롤된 길이)
    // 화면에 로딩된 페이지의 전체 높이
    // 뷰포트의 높이 + 스크롤된 길이 + 10 === 화면에 로딩된 페이지의 전체 높이

    if(window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight){
        if (timer === null) {
            fetchImages(pageToFetch++);
            timer = setTimeout(() => {
                timer = null;
            }, 500);
        }
    }});
}

async function fetchImages(pageNum){
    try {
        const response = await fetch('https://picsum.photos/v2/list?page='+pageNum+'&limit=9');
        if (!response.ok) {
            throw new Error("네트워크 응답에 문제가 있습니다.");
        }

        const datas = await response.json();
        makeImageList(datas);

    } catch (error) {
        console.error("데이터를 가져오는데 문제가 발생했습니다 :", error);
    }
}



function makeImageList(datas){
    
    let cnt = 0;    
    plus = "";
    datas.forEach((item)=>{
        
        cnt += 1;
        if (cnt % 3 == 1) {
            plus += "<div class='section_middle_moreitems_row'>";
        }
        plus += "<img src="+ item.download_url +" alt=''>";
        if (cnt % 3 == 0) {
            plus += "</div>";
            imageList.innerHTML += plus;
            plus = "";
        }
        
        
    }); 
}