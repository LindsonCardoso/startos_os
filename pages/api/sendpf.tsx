import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/bd'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { body, method } = req;
  const 
  {
    nome,
    cpf,
    whatsapp,
    email,
    cep,
    bairro,
    logradouro,
    numero,
    cidade,
    complemento,
    uf,
    ibge,
    captcha
  } = body
  const tipo = "PF";
  const origem = "STARTOS"
  
  if (method === "POST") {
    
    if (!captcha || !nome || !cpf) {
    return res
      .status(422)
      .json({ message: 'Dados nao informados'})
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        method: "POST",
      }
    );
    const captchaValidation = await response.json();
    if (captchaValidation.success) {
      const results = await query(
        `
        SELECT COUNT(*) verificar from cad_empresa where cli_documento = ?
        `,
        [filter.clean(cpf)]
      )
      var verif = JSON.stringify(results);
      //console.log(verif);
      var json = JSON.parse(verif);
      if (json[0].verificar == 1) {
       return res.status(422).json({ message: 'CPF JA CADASTRADO' })
      } else 
      {
        const sqlInsert = await query(
          `
          INSERT INTO cad_empresa 
          (
           cli_nome, 
           cli_documento,
           cli_tipo,
           cli_celular,
           cli_email,
           cli_origem,
           cli_cep,
           cli_logradouro,
           cli_numero,
           cli_bairro,
           cli_cidade,
           cli_uf,
           cli_ibge,
           cli_complemento 
           ) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         `,
          [
            filter.clean(nome),
            filter.clean(cpf),
            filter.clean(tipo),
            filter.clean(whatsapp),
            filter.clean(email),
            origem,
            filter.clean(cep),
            filter.clean(logradouro),
            filter.clean(numero),
            filter.clean(bairro),
            filter.clean(cidade),
            filter.clean(uf),
            filter.clean(ibge),
            complemento,
          ]
        )
        return res.status(200).json({message: "successfull"})
      }
    }
    return res.status(422).json({
      message: "Unproccesable request, Invalid captcha code",
    });
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
 }
 return res.status(422).json({
  message: "Unproccesable request, Invalid captcha code",
});
}

export default handler