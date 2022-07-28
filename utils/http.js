import axios from "axios";

export async function getChapterList(url){
    const response = await axios.get(url);
    let res = [];
    if(response != ''){
        let j = response.data.length;
        for(let i = 0; i < response.data.length; i++){

            res.push({id: j, url:response.data[i]})
            j--;
        }
    }else{
        return [];
    }
   
    return res;
}

export async function getChapter(url,chapterUrl){
    console.log(url,chapterUrl);
    const data = JSON.stringify({'chapterlink': chapterUrl})
   try
    {
        const response = await axios.post(url, data, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch(e){
        return ['https://i.pinimg.com/736x/16/65/ee/1665ee47b8a2c8954418fdf64689da41.jpg']
    }
}