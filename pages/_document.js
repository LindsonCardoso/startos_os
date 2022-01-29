import Document, {Html, Head, Main, NextScript} from  'next/document';

export default class MyDocument extends Document {

  static async getInitialState(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

    render() {
      return(
        <Html lang="pt-BR">
          <Head /> 
        <body>
    
        <Main />
        <NextScript />

      </body>
        </Html>
      );
    }
}