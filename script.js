let baseUrl = new URL(location.href)
let chapter=  baseUrl.search.split('&mangaChapter=').pop()
let manga_title  =  baseUrl.search.split('&')[0].split('?mangaTitle=').pop()

console.log(baseUrl.search);
console.log(`Manga Title: ${manga_title}`);
console.log(`Manga Chapter: ${chapter}`);



function generatePages(res){
    var html_res = new DOMParser().parseFromString(res, "text/html");
    var scripts = html_res.querySelectorAll("script")
    var selected_script = scripts[scripts.length-1].innerHTML

    var selected_script2 = scripts[scripts.length-3].innerHTML
    // console.log(selected_script2)

    var pages = []
    var res = selected_script;

    var manga_url = findMatch(res,'vm.CurPathName = "','";')
    var manga_title = findMatch(res,'vm.IndexName = "','";')
    // var chapter_num = getMangaChapter(res)
    var chapter_num = findMatch(selected_script2,`'eventLabel'	: "Chapter `,`"`)
    var digitsToAdd = fixDigits(chapter_num,chapter_num.length)
    chapter_num = digitsToAdd

    var mangaPageLength =  getMangaPage(res);
    // console.log(manga_url)
    // console.log(manga_title)
    console.log(chapter_num)
    console.log("------------------------------------------------")

    for (let index = 0; index < mangaPageLength; index++) {
        var newLink = manga_url + "/manga/"+manga_title +"/" + chapter_num + "-" + (index+1).toString().padStart(3,"0") + ".png"
        pages.push(newLink)
        //console.log(newLink)
    }

return pages
}


function findMatch(res,first,ed){
    var res = res.match(new RegExp(first + "(.*)" + ed));
    return res[1]
  }

  
  function fixDigits(chapter,digits){
    if(chapter.includes(".")){
      var newChapter = chapter.split(".") 
      var right_digits = newChapter[1]
    
      newChapter = newChapter[0]
      console.log("Digits: " + newChapter + ", Length: " + newChapter.length)
      console.log("Digits: " + digits)
    
    
      if(newChapter.length = 3){
        newChapter = newChapter.padStart(4,"0")
      }
      
      return `${newChapter}.${right_digits}`
    }
    else{
      return chapter.padStart(4,"0")
    }
    
  }


  function getMangaPage(res){
    var mangaPage = res.split('"Page":"')
    var page = mangaPage[1].split('"')
    console.log(page[0])
    return page[0]
}


function getMangaChapter(qq){
    var res = ""

    axios.get(qq)
  .then((response) => {
        var ul = document.getElementById("images");
        ul.innerHTML = ""
        res = response.data
        mangaPages = generatePages(res)

  }).catch((error) => {
    console.error(error)
  });

}

getMangaChapter("https://mangasee123.com/read-online/Black-Clover-chapter-332.html")