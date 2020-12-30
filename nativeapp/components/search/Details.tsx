import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Image, ListItem} from 'react-native-elements';
import { Title, Paragraph, List, Card } from 'react-native-paper';

//GraphQL query, henter inn mer informasjon om en character.
const GET_CHARACTER_INFO = gql`
  query character($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      image
      gender
      created
      origin {
        name
        type
        dimension
      }
      locationName: location {
        name
        type
        dimension
      }
      episode {
        name
        episode
        air_date
      }
    }
  }
`;

interface Props {
  id: number;
}

const Details = ({ id }: Props) => {
  const { loading, data } = useQuery(GET_CHARACTER_INFO, {
    variables: { id: id },
  });

  const [expanded, setExpanded] = React.useState(false); //Visning av episoder

  //Håndterer vising av epsidoer med dropdown
  const handlePress = () => setExpanded(!expanded);

  if (data) {
    const char = data.character;
    return(
      <Card style={styles.overlay}>
        <ScrollView>
        <Image
          style={styles.imgStyle}
          source={{ uri: char.image }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Title style={styles.titleStyle}>{char.name}</Title>
        <View style={styles.infoStyle}>
            <Paragraph>Species: {char.species}</Paragraph>
            <Paragraph>Status: {char.status}</Paragraph>
            <Paragraph>Gender: {char.gender}</Paragraph>
            <Paragraph>Type: {char.type}</Paragraph>
            <Paragraph>Origin: {char.origin.name}</Paragraph>
            <Paragraph>Dimension: {char.origin.dimension}</Paragraph>
        </View>
        <List.Section>
            <List.Accordion
              title="Episodes"
              left={props => <List.Icon {...props} icon="television-classic"/>}
              expanded={expanded}
              onPress={handlePress}
            >
            <View style={{paddingLeft: 0}}>
              {char.episode.map((res: any) => (
                <ListItem key={res.name}>
                  <ListItem.Content>
                    <ListItem.Title>
                      {res.name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.subtextStyle}>
                      {res.episode}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtextStyle}>
                      {res.air_date}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
            </List.Accordion>
          </List.Section>
        </ScrollView>
      </Card>
    )
  }

  if (loading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="rgb(0, 122, 255)" />
      </View>
    );
  }

  return(
    <View style={styles.activity}>
      <Text>Error</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  overlay: { 
    minWidth: '80%',
    flex: 1,
    padding: 0,
    shadowOpacity: 0
    
  },
  imgStyle: {
    height: 200,
    width: '100%',
  },
  titleStyle: {
    maxWidth: '90%',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  infoStyle: {
    marginLeft: 15,
  },
  subtextStyle: {
    marginTop: 3,
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)'
  },
  activity:{
    minWidth: '80%',
    flex: 1,
    justifyContent: 'center'
  }
});

export default Details;