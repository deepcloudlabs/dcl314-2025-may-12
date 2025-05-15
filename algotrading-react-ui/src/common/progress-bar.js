export default function ProgressBar({value,max}){
    let percent = (value*100)/max;
    let bgColor = "bg-primary";
    if (percent < 25)
        bgColor = "bg-danger";
    else if (percent < 50)
        bgColor = "bg-warning";
    return (
        <div className={"progress"}>
            <div className={"progress-bar ".concat(bgColor)}
                 style={{width: `${percent}%`}}></div>
        </div>
   );
}