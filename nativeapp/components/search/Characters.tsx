import React, { useState, useEffect, useRef} from 'react'
import {Text, View, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { useLazyQuery, gql } from '@apollo/client';
import ListItem from './ListItem'
import {Overlay} from 'react-native-elements'
import Details from './Details';

//GraphQL query
const GET_CHARACTERS = gql`
  query characters($name: String!, $page: Int!, $status: String!, $species: String!, $gender: String!){
    characters(page: $page, filter: { name: $name, status: $status, species: $species, gender: $gender }) {
      info {
        count
        next
      }
      results {
        name
        image
        id
      }
    }
  }
`

//Tar in props fra search, queryen er basert på disse variablene
interface Props{
    searchInput: string;
    status: string;
    species: string;
    gender: string;
}

const Characters = (props: Props) => {
    const [page, setPage] = useState(1) //Hvilken side som skal lastes inn, laster inn 20 resultater om gangen
    const [visible, setVisible] = useState(false) //Om overlay skal vises eller ikke
    const [showMore, setShowMore] = useState(0) //Id til karakteren som vises i overlay, 0 er ingen
    const [result, setResult] = useState([]) //Liste med resultatsettet
    const [moreResults, setMoreResults] = useState(true) //Om det finnes fler resultater
    const [getCharacters, {loading, error, data }] = useLazyQuery(GET_CHARACTERS, //kalles når vi skal fetche med graphQL
        {variables: {
            name: props.searchInput, 
            page: page, 
            status: props.status, 
            species: props.species, 
            gender: props.gender
        }})
    const flatListRef = useRef<any>(null) //Blir brukt for å kunne scolle til toppen av siden ved nytt søk


    //Når data oppdateres
    useEffect(() => {
        if(!data) return

        let newRes: any
        if(page!== 1){ //Dersom vi skal laste inn mer data ved scolling
            newRes = [...result, ...data.characters.results]
        }
        else{
            newRes = data.characters.results
        }
        setResult(newRes)
    }, [data])

    //Når det blir sendt ny prop
    useEffect(() => {
        setPage(1) //Setter page til 1 for å vise første resultat og fetcher på nytt med oppdaterte verdier
        scrollToTop() //Sørger for at vi scroller til toppen av siden
        getCharacters() //Fetcher på nytt
    },[props.searchInput,props.status, props.species, props.gender])

    const handleOnEndReached = () => {
        if(data){
            //Vil ikke laste inn mer om det ikke finnes mer data, satt til null om ikke
            if(data.characters.info.next){
                setMoreResults(true)
                setPage(page +1 )
                getCharacters()  
            }
            else{
                setMoreResults(false)
            }  
        }
    }

    const renderFooter = () => {
        if(moreResults){
            //Gir et loading ikon dersom det finnes mer resultater
            return <ActivityIndicator size="large" color="rgb(0, 122, 255)" />
        }
        else{
            return <Text style = {styles.result}>End of results</Text>
        }
    }

    //Brukes så man scroller til toppen ved nye søk
    const scrollToTop = () => {
        if(flatListRef && flatListRef.current){
            flatListRef.current.scrollToOffset({ animated: false, offset: 0 })
        }
    }

    //Hvert item som skal lastes i listen, ListItem er komponentet som laster inn mer info med graphQL
    const renderItem = (res: any) => {
        return (
            <TouchableOpacity onPress={() => { //Hånterer om vi viser mer info eller ikke
                if(showMore !== res.item.id) setShowMore(res.item.id)
                else setShowMore(0)
                setVisible(!visible)
            }}>
                <ListItem res={res} />
            </TouchableOpacity>
        )
    }
    
    //Loading bar dersom det ikke er lastet inn noen resultater.
    if(loading && result.length === 0){
        return (
            <View>
                <ActivityIndicator size="large" color="rgb(0, 122, 255)" />
            </View>
        )  
    }

    if(error){
        return <Text style= {styles.result}>No results</Text>
    }

    //Flatlist som viser alle søkerasultatene, tar i bruk onEndReached til dynamisk lasting av ny data.
    if(result.length !== 0){
        return(
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={result} 
                renderItem={renderItem}
                onEndReachedThreshold={2}
                onEndReached={handleOnEndReached} 
                ListFooterComponent={renderFooter()}
                removeClippedSubviews={true}
            />
            <Overlay overlayStyle={styles.overlay} isVisible={visible} onBackdropPress={() => {setVisible(!visible); setShowMore(0)}}>
                <Details id={showMore}/>
            </Overlay>
        </View>
        )
    }

    return(
        <ActivityIndicator size="large" color="rgb(0, 122, 255)" />
    ) 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    result: {
        textAlign:'center', 
        fontSize: 20, 
        marginBottom:30, 
        marginTop:10, 
        opacity:0.4,
    },
    overlay: {
        flex: 0.8
    }
});

export default Characters