// app/index.tsx

import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";

const headerImg = require('../assets/images/developer.jpg')
const booksImg = require('../assets/images/books.jpg');
const bookImg1 = require('../assets/images/icon.png');
const bookImg2 = require('../assets/images/books.png');
const laughingImg = require('../assets/images/funny.png');
// Props type for Jokes component
type Joke = { setup: string; punchline: string };
type JokesProps = {
  jokes: Joke[];
  loading: boolean;
  error: string | null;
  getJokes: () => void;
};

const Jokes = ({ jokes, loading, error, getJokes }: JokesProps) => {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Click for a joke</Text>

      
      <Pressable onPress={getJokes}>
        <Image source={laughingImg} style={{height:200, width: 300, alignSelf:'center', objectFit:'contain'}}/>
      </Pressable>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <ScrollView>
          {jokes.map((joke, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 18 }}>{joke.setup}</Text>
              
              <Text style={{ fontSize: 18, fontWeight: '600' }}>{joke.punchline}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default function Index() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getJokes = () => {
    setLoading(true);
    setError(null);
    fetch('https://official-joke-api.appspot.com/jokes/programming/random')
      .then((response) => response.json())
      .then((json) => {
        setJokes(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch jokes');
        setLoading(false);
      });
  };

  useEffect(() => {
    getJokes();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F6EB69" }}>
      <Text style={{
        fontWeight: '500',
        fontSize: 40,
        alignSelf: "center",
        color: "black",
        shadowOpacity: 0.1
      }}>
        Hi Developer
      </Text>

      <Image
        source={headerImg}
        style={{ width: '100%' , height: 150, objectFit: 'fill', alignSelf:'center' }}
      />

      <ScrollView style={{padding:50}}>

      <Jokes
        
        jokes={jokes}
        loading={loading}
        error={error}
        getJokes={getJokes}
      />
        <Image source={bookImg1} style={{ alignSelf: "center", width: 350, height: 450, padding: 60 }} />
        <Image source={bookImg1} style={{ alignSelf: "center", width: 350, height: 450, padding: 60 }} />
        <Image source={bookImg1} style={{ alignSelf: "center", width: 350, height: 450, padding: 60 }} />
        <Image source={bookImg1} style={{ alignSelf: "center", width: 350, height: 450, padding: 60 }} />
        
      </ScrollView>

      {/* Joke section */}
      
    </View>
  );
}
