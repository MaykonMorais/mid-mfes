import { lazy } from "react";


const components = {
    'header': lazy(() => import('header/Header')),
    'content': lazy(() => import('content/Content')),
    'footer': lazy(() => import('footer/Footer')),
}

const mfeRenderer = ({type}: {type: string}) => {
    return components[type]
}

export default mfeRenderer

