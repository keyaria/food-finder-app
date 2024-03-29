import { VStack, Heading, Text, Link, Image } from '@chakra-ui/react'
import { Restaurant } from '../../types/Restaurant'



function RestaurantCard({restaurant}:any) {

    let photo: string[] | undefined | null

    if(restaurant.photos){
    photo = restaurant.photos[0].html_attributions
    }

    return(
        <VStack>

           <Link><Heading>{restaurant.name}</Heading></Link>
           {photo && (<Image src={photo[0]}/>)}
           <Text>{restaurant.vicinity}</Text>
            <Text>{restaurant.rating}</Text>
            <Text>{restaurant.price_level}</Text>
            
        </VStack>
        
    )
}

export default RestaurantCard