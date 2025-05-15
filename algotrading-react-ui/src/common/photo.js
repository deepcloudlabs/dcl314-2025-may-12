export default function Photo({id, label,value,handleChange}){
    function handleFileChange(event){
       const fileReader = new FileReader();
       const fileName = event.target.files[0];
       fileReader.onload = (e) => {
           handleChange(e.target.result);
       }
       fileReader.readAsDataURL(fileName);
    }

    return (
        <div className="input-group">
            <label className="form-label"
                   htmlFor={id}>{label}: </label>
            <img className={"img-thumbnail"}
                 style={{width: "64px",height: "64px"}}
                 src={value}
                 alt={""}></img>
            <label>
            <input type={"file"}
                   onChange={handleFileChange}
                   style={{display: "none"}}/>
            <span className="btn btn-success">File</span>
            </label>
        </div>
    );
}