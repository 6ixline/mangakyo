import axios from "axios";

export async function getChapterList(data){
    try{ 
        data = JSON.stringify(data);
        const response = await axios.post("https://jujustu.herokuapp.com/manga/chapterlists", data, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
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
    }catch(e){
        return [];
    }
   
}

export async function getChapter(data){
    data = JSON.stringify(data)
    try
    {
        const response = await axios.post('https://jujustu.herokuapp.com/manga/chapterdata', data, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch(e){
        return ['https://i.pinimg.com/736x/16/65/ee/1665ee47b8a2c8954418fdf64689da41.jpg']
    }
}
export async function getMangaData(){
   try
    {
        const response = await axios.get("https://jujustu.herokuapp.com/mangadata");
        return response.data;
    }catch(e){
        return [{"title": "No Data Found", "manga": []}]
    }
}