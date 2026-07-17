import './style.css'
import './theme.css'
import 'remixicon/fonts/remixicon.css'



 const filtersContainerDiv = document.getElementById("filters") as HTMLDivElement;
 const imageCanvas = document.getElementById("image-canvas") as HTMLCanvasElement;
 const imageInput  = document.getElementById("image-input") as HTMLInputElement;
 const ctx = imageCanvas.getContext("2d") as CanvasRenderingContext2D;
 const placeholderImage = document.querySelector("#placeholder-image") as HTMLDivElement;
 let file:File | null = null;
 let image: HTMLImageElement | null = null;
 const resetBtn = document.querySelector(".reset-btn") as HTMLButtonElement; 
const downloadBtn = document.querySelector(".download-btn") as HTMLButtonElement;
const presetsContainer = document.querySelector("#presets-btns") as HTMLDivElement;



interface FilterType  {
  value:string;
  min:string;
  max:string;
  unit:string;
}



interface Filter<T>{
  brightness:T,
  contrast:T,
  saturation:T,
  hueRotation:T,
  blur:T,
  grayscale:T,
  sepia:T,
  opacity:T,
  invert:T

}




let filters:Filter<FilterType> = {
  brightness:{
    value:"100",
    min:"0",
    max:"200",
    unit:"%"
  },
  contrast:{
    value:"100",
    min:"0",
    max:"200",
    unit:"%"
  },

  saturation:{
     value:"100",
     min:"0",
     max:"200",
     unit:"%"
  },
  hueRotation:{
    value:"0",
    min:"0",
    max:"360",
    unit:"deg",
  },
  blur:{
    value:"0",
    min:"0",
    max:"20",
    unit:"px"
  },
  grayscale:{
    value:"0",
    min:"0",
    max:"100",
    unit:"%"
  },
  sepia:{
    value:"0",
    min:"0",
    max:"100",
    unit:"%"
  },
  opacity:{
    value:"100",
    min:"0",
    max:"100",
    unit:"%",
  },
  invert:{
     value:"0",
     min:"0",
     max:"100",
     unit:"%"
  }
}








function createFilterElement(name:string,value:string,min:string,max:string):HTMLDivElement {
  
  const div = document.createElement("div") as HTMLInputElement;
  div.classList.add("filter");


  const p = document.createElement("p") as HTMLInputElement;
  p.textContent = name;


  const input = document.createElement("input") as HTMLInputElement;
  input.type = "range";
  input.name=  name;
  input.id= name;
  input.min = min;
  input.max = max;
  input.value = value;


  input.addEventListener("input",(e)=>{
    const target = e.target as HTMLInputElement;
    const key = target.name as keyof typeof filters;
    filters[key].value = target.value;
    // console.log(filters[key])
    applyFilters()
  })


  div.appendChild(p);
  div.appendChild(input);
  return div

}



function createFilters(){
Object.keys(filters).forEach(filterName=>{
  const key = filterName as keyof typeof filters;
  //  console.log(filterName,filters[key])
  filtersContainerDiv.appendChild(createFilterElement(filterName, filters[key].value, filters[key].min, filters[key].max));
})
}

createFilters()


/** load image after choose the image */

imageInput.addEventListener("change",(e)=>{
   
  const input = e.target as HTMLInputElement;
    file = input.files?.[0]!;
  //  console.log(file)

   const img = new Image();
   img.src = URL.createObjectURL(file as File);
   
  //  console.log(img)
  /** this callback will run when my image is loaded */
    img.onload = function(){
      image = img;
      placeholderImage.style.display = "none";
      imageCanvas.hidden = false;
      imageCanvas.width = img.width;
      imageCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }


})






function applyFilters(){ 
   
  ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);     
  
  ctx.filter = `brightness(${filters.brightness.value}${filters.brightness.unit}) 
  contrast(${filters.contrast.value}${filters.contrast.unit}) 
  saturate(${filters.saturation.value}${filters.saturation.unit})
   hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit}) 
   blur(${filters.blur.value}${filters.blur.unit}) 
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
   sepia(${filters.sepia.value}${filters.sepia.unit}) 
  opacity(${filters.opacity.value}${filters.opacity.unit})
 invert(${filters.invert.value}${filters.invert.unit})`;
  if (!image) return;
   ctx.drawImage(image, 0, 0);
}




/** reset all filters to default values */
resetBtn.addEventListener("click",()=>{

  filters = {
  brightness:{
    value:"100",
    min:"0",
    max:"200",
    unit:"%"
  },
  contrast:{
    value:"100",
    min:"0",
    max:"200",
    unit:"%"
  },

  saturation:{
     value:"100",
     min:"0",
     max:"200",
     unit:"%"
  },
  hueRotation:{
    value:"0",
    min:"0",
    max:"360",
    unit:"deg",
  },
  blur:{
    value:"0",
    min:"0",
    max:"20",
    unit:"px"
  },
  grayscale:{
    value:"0",
    min:"0",
    max:"100",
    unit:"%"
  },
  sepia:{
    value:"0",
    min:"0",
    max:"100",
    unit:"%"
  },
  opacity:{
    value:"100",
    min:"0",
    max:"100",
    unit:"%",
  },
  invert:{
     value:"0",
     min:"0",
     max:"100",
     unit:"%"
  }
}
  applyFilters();
  filtersContainerDiv.innerHTML = "";
  createFilters();
})



/** download filtered image */
downloadBtn.addEventListener("click",()=>{
  const link = document.createElement("a");
  link.download = "filtered-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
})






/** preset setting */

interface Preset {
  brightness:string,
  contrast:string,
  saturation:string,
  hueRotation:string,
  blur:string,
  grayscale:string,
  sepia:string,
  opacity:string,
  invert:string
}

interface Presets<T = Preset> {
  [key: string]: T;
}

const presets: Presets = {
  Original: {
    brightness: "100",
    contrast: "100",
    saturation: "100",
    hueRotation: "0",
    blur: "0",
    grayscale: "0",
    sepia: "0",
    opacity: "100",
    invert: "0",
  },

  Drama: {
    brightness: "90",
    contrast: "150",
    saturation: "115",
    hueRotation: "0",
    blur: "0",
    grayscale: "0",
    sepia: "10",
    opacity: "100",
    invert: "0",
  },

  Vintage: {
    brightness: "105",
    contrast: "90",
    saturation: "75",
    hueRotation: "10",
    blur: "0",
    grayscale: "10",
    sepia: "55",
    opacity: "100",
    invert: "0",
  },

  OldSchool: {
    brightness: "95",
    contrast: "85",
    saturation: "60",
    hueRotation: "0",
    blur: "0",
    grayscale: "35",
    sepia: "80",
    opacity: "100",
    invert: "0",
  },

  Noir: {
    brightness: "95",
    contrast: "170",
    saturation: "0",
    hueRotation: "0",
    blur: "0",
    grayscale: "100",
    sepia: "0",
    opacity: "100",
    invert: "0",
  },

  Cinematic: {
    brightness: "95",
    contrast: "130",
    saturation: "120",
    hueRotation: "-8",
    blur: "0",
    grayscale: "0",
    sepia: "8",
    opacity: "100",
    invert: "0",
  },

  Warm: {
    brightness: "105",
    contrast: "105",
    saturation: "120",
    hueRotation: "8",
    blur: "0",
    grayscale: "0",
    sepia: "20",
    opacity: "100",
    invert: "0",
  },

  Cool: {
    brightness: "100",
    contrast: "105",
    saturation: "110",
    hueRotation: "-12",
    blur: "0",
    grayscale: "0",
    sepia: "0",
    opacity: "100",
    invert: "0",
  },

  Dreamy: {
    brightness: "110",
    contrast: "85",
    saturation: "110",
    hueRotation: "5",
    blur: "2",
    grayscale: "0",
    sepia: "12",
    opacity: "100",
    invert: "0",
  },

  Fade: {
    brightness: "110",
    contrast: "75",
    saturation: "85",
    hueRotation: "0",
    blur: "0",
    grayscale: "15",
    sepia: "15",
    opacity: "90",
    invert: "0",
  },

  Retro: {
    brightness: "108",
    contrast: "95",
    saturation: "80",
    hueRotation: "18",
    blur: "0",
    grayscale: "20",
    sepia: "45",
    opacity: "100",
    invert: "0",
  },

  HighContrast: {
    brightness: "100",
    contrast: "180",
    saturation: "110",
    hueRotation: "0",
    blur: "0",
    grayscale: "0",
    sepia: "0",
    opacity: "100",
    invert: "0",
  },

  Soft: {
    brightness: "108",
    contrast: "92",
    saturation: "105",
    hueRotation: "0",
    blur: "1",
    grayscale: "0",
    sepia: "5",
    opacity: "100",
    invert: "0",
  },

  Inverted: {
    brightness: "100",
    contrast: "100",
    saturation: "100",
    hueRotation: "180",
    blur: "0",
    grayscale: "0",
    sepia: "0",
    opacity: "100",
    invert: "100",
  },
};



Object.keys(presets).forEach(presetName => {
   const btn = document.createElement("button") as HTMLButtonElement;
    btn.textContent = presetName;
    presetsContainer.appendChild(btn);
    btn.addEventListener("click",()=>{
      const presetObj = presets[presetName];
      // console.log(presetObj)
      
      Object.keys(presetObj).forEach(filterName=>{
        const key = filterName as keyof typeof filters;
        filters[key].value = presetObj[filterName as keyof Preset];
      });

      applyFilters();
      filtersContainerDiv.innerHTML = "";
      createFilters();


    })
      
})