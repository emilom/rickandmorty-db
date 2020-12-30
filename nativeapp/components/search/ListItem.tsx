import React from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import { Card, Title, Paragraph} from 'react-native-paper'
import { Image } from 'react-native-elements';

interface Props{
    res: any
}


class ListItem extends React.Component<Props> {
    constructor(props: Props){
        super(props)
    }

    //Ønsker ikke at alle ListItem må oppdateres når vi laster inn mer data ved scolling
    //Denne metoden blir brukt for performance optimization
    shouldComponentUpdate(){
        return false
    }

    render(){
        return(
            <Card style={styles.cardStyle}>
                <View style={styles.cardContentStyle}>
                    <Image
                            style={styles.imgStyle}
                            source={{uri: this.props.res.item.image}}
                            PlaceholderContent={<ActivityIndicator />} 
                    />
                    <Card.Content style={styles.charHeadStyle}>
                        <Title style={styles.titleStyle}>{this.props.res.item.name}</Title>
                        <Paragraph style={styles.parStyle}>Click for more information</Paragraph>
                    </Card.Content>
                </View>
            </Card>    
         )
    }
}

export default ListItem

const styles = StyleSheet.create({
    cardStyle: {
        height: 130,
        marginBottom: 20,
        shadowOffset: {'width': 0, 'height': 3},
        shadowRadius: 4,
    },
    cardContentStyle: {
        display: 'flex',
        flexDirection: 'row',
    },
    imgStyle: {
        height: 130,
        width: 130,
    },
    titleStyle: {
        maxWidth: '85%',
    },
    parStyle: {
        color: 'rgba(0,0,0,0.5)',
    },
    charHeadStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
  });