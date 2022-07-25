import axios from "axios";

export async function getChapterList(){
    const response = await axios.get('https://jujustu.herokuapp.com/chapters');
    let res = [];
    if(response != ''){
        let j = response.data.length;
        for(let i = 0; i < response.data.length; i++){

            res.push({id: j, url:response.data[i]})
            j--;
        }
    }else{
        return [{id: 1, url:'https://testing.com'}];
    }
   
    return res;
}

export async function getChapter(url){
    const data = JSON.stringify({'chapterlink': url})
   try
    {
        const response = await axios.post("https://jujustu.herokuapp.com/chapterdetails", data, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch(e){
        return ['https://i.pinimg.com/736x/16/65/ee/1665ee47b8a2c8954418fdf64689da41.jpg']
    }
}