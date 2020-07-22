import { createElement, Text, Wrapper } from "./createElement";
import { Carousel } from "./carousel.view";

console.log(Carousel);

let component = new Carousel();

component.mountTo(document.body);

console.log(component);
