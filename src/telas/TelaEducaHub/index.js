import React, { useState, useRef } from 'react';
import { TouchableOpacity, ScrollView, Linking, Image, View, Text, TextInput, StyleSheet, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Iconify } from 'react-native-iconify';
import WebView from 'react-native-webview';

const { width } = Dimensions.get('window');

export default function TelaEducaHub({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoURL, setVideoURL] = useState('https://www.youtube.com/embed/QaFCVM97N0w?autoplay=0');
  const webViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselItems = [
    { src: require('../../imagens/TelaEducaHub/FolhaPE.png') },
    { src: require('../../imagens/TelaEducaHub/Desabamento.png') },
    { src: require('../../imagens/TelaEducaHub/Alagamento.png') },
  ];

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % carouselItems.length;
    setActiveIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
    setActiveIndex(prevIndex);
  };

  const handlePlayVideo = () => {
    setVideoURL('https://www.youtube.com/embed/QaFCVM97N0w?autoplay=1');
    webViewRef.current.injectJavaScript(`
      var video = document.querySelector('iframe');
      if (video) {
        video.src += "&autoplay=1";
      }
      true;
    `);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('TelaHome')}>
          <Icon name="arrow-back" size={25} color="#02385A" style={styles.backIcon} />
        </TouchableOpacity>
      <View style={styles.textoContainer}>
      </View>
        <Text style={styles.texto1}>EducaHub</Text>
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <Icon name="search-outline" size={25} style={styles.iconSearch} />
          <TextInput style={styles.input} placeholder="Buscar Conteúdo" placeholderTextColor="rgba(94, 94, 94, 0.6)" />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.texto2}>Últimas notícias</Text>
        <View style={styles.carouselWrapper}>
          <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
            <Icon name="caret-back-outline" size={20} style={styles.arrowButton} />
          </TouchableOpacity>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            ref={scrollView => { scrollView && scrollView.scrollTo({ x: activeIndex * width, animated: true }) }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
            scrollEventThrottle={16}
          >
            {carouselItems.map((item, index) => (
              <View style={[styles.carouselItem, { width }]} key={index}>
                <Image source={item.src} style={styles.carouselImage} />
              </View>
            ))}
          </Animated.ScrollView>
          <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
            <Icon name="caret-forward-outline" size={20} style={styles.arrowButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.dotsWrapper}>
          {carouselItems.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
              onPress={() => setActiveIndex(index)}
            />
          ))}
        </View>
        <Text style={styles.texto3}>Educação e Preparação para Crises</Text>
        <View style={styles.videoTextoContainer}> 
          <View style={styles.conteudoContainer}>
            <WebView
              ref={webViewRef}
              source={{ uri: videoURL }}
              style={styles.video}
            />
          </View>
          <View style={styles.textoBotaoContainer}>
            <Text style={styles.textoDescricao}>Prevenção em Ação: Enchentes</Text>
            <Text style={styles.textoDescricao2}>Vídeo</Text>
            <TouchableOpacity style={styles.botao} onPress={handlePlayVideo}>
              <Text style={styles.textoBotao}>Acessar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.videoTextoContainer}> 
          <View style={styles.conteudoContainer}>
            <Image style={styles.imagem2} resizeMode="cover" source={require('../../imagens/TelaEducaHub/Sesi.png')} />
          </View>
          <View style={styles.textoBotaoContainer}>
            <Text style={styles.textoDescricao}>PRIMEIROS SOCORROS:</Text>
            <Text style={styles.textoDescricao3}>COMO AGIR EM SITUAÇÕES DE EMERGÊNCIA NA INDÚSTRIA?</Text>
            <Text style={styles.textoDescricao2}>Artigo</Text>
            <TouchableOpacity style={styles.botao} onPress={() => Linking.openURL('https://precismec.com.br/como-agir-em-situacoes-de-emergencia-na-industria/')}>
              <Text style={styles.textoBotao}>Acessar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.videoTextoContainer}> 
          <View style={styles.conteudoContainer}>
            <Image style={styles.imagem2} resizeMode="cover" source={require('../../imagens/TelaEducaHub/Chuva.png')} />
          </View>
          <View style={styles.textoBotaoContainer}>
            <Text style={styles.textoDescricao}>Chuvas em Pernambuco:</Text>
            <Text style={styles.textoDescricao3}>Inundação de rios, desabrigados e transtornos são registrados</Text>
            <Text style={styles.textoDescricao2}>Notícia</Text>
            <TouchableOpacity style={styles.botao} onPress={() => Linking.openURL('https://www.diariodepernambuco.com.br/noticia/vidaurbana/2024/06/chuvas-em-pernambuco-inundacao-de-rios-desabrigados-e-transtornos-sa.html#:~:text=Em%20virtude%20das%20chuvas%20constantes,emitiu%20um%20novo%20aviso%20hidrol%C3%B3gico.')}>
              <Text style={styles.textoBotao}>Acessar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  backIcon: {
    marginTop: 55,
    marginLeft: 30,
    alignItems: 'flex-start'
  },
  texto1: {
    marginTop: 55,
    marginLeft: 100,
    fontSize: 20,
    fontWeight: '700',
    color: '#02385A',
  },
  texto2: {
    marginLeft: 25,
    marginTop: 25,
    fontSize: 16,
    fontWeight: '600',
    color: '#02385A',
  },
  texto3: {
    marginLeft: 40,
    marginTop: 25,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#02385A',
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '80%',
    borderRadius: 20,
    backgroundColor: '#f3f3f3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    elevation: 15,
    shadowOpacity: 0.20,
    paddingHorizontal: 10,
    gap: 10,
  },
  iconSearch: {
    fontWeight: 'bold',
    marginLeft: 8,
    width: 25,
    height: 25,
    marginRight: 10,
  },
  input: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#f3f3f3',
    fontSize: 17,
    fontWeight: '500',
  },
  mainContainer: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  carouselWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 380,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    elevation: 15,
    shadowOpacity: 0.20,
  },
  arrowButton: {
    color: '#6192B1',
    marginRight: 4,
    marginLeft: 2
  },
  carouselItem: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 180, 
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  carouselImage: {
    marginLeft: 2,
    width: '75%',
    height: '90%',
    resizeMode: 'cover', 
    borderRadius: 20, 
  },
  dotsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#02385A',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  videoTextoContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  conteudoContainer: {
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    height: 120, 
    width: 120,
    overflow: 'hidden',
    marginLeft: 25
  },
  video: {
    width: '100%', 
    height: '100%',
  },
  textoBotaoContainer: {
    padding: 10,
    width: '60%', 
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textoDescricao: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    marginLeft: 3,
    color: '#02385a',
  },
  textoDescricao2: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 8,
    marginLeft: 3,
    color: 'rgba(94, 94, 94, 0.6)',
  },
  textoDescricao3: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 3,
    color: '#02385a',
  },
  botao: {
    backgroundColor: '#6192b1',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 0.15,
    width: 70,
    height: 25
  },
  textoBotao: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  imagem2: {
    width: '100%',
    height: '100%'
  }
});
