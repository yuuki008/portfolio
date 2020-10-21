import React, {useCallback, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import './Contact.css'
import { makeStyles } from '@material-ui/styles';
import {Button} from '@material-ui/core';

const useStyles = makeStyles({
    list:{
        color: 'white !important',
    },
    info:{
        width: '48%',
    },
    line:{
        borderBottom: '1px solid white'
    },
    button:{
        fontSize: '18px',
        fontWeight: 400,
        backgroundColor: '#242127',
        borderStyle: 'none',
    }
})

const Contact = () => {
    const classes = useStyles()
    const [name, setName] = useState(""),
          [email, setEmail] = useState(""),
          [description, setDescription] = useState("");

    const inputName = useCallback((e) => {
        setName(e.target.value)
    },[setName])

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[setEmail])

    const inputDescription = useCallback((e) => {
        setDescription(e.target.value)
    },[setDescription])

    const validateInput = (...args) => {
        let isBlank = false;
        for(let i = 0; i < args.length;  i=(i+1)|0){
            if(args[i] === ""){
                isBlank = true
            }
        }
        return isBlank
    } 

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return regex.test(email)
    }
    
    const submitForm = () => {
        const isBlank = validateInput(name, email, description)
        const isValidateEmail = validateEmail(email)

        if(isBlank){
            alert('必須入力が未入力です')
        }else if(!isValidateEmail){
            alert('メールアドレスの書式が異なります。')
        }else{
            const payload = {
                text: 'お問い合わせがありました\n'
                    + 'お名前:' + name + '\n'
                    + 'メールアドレス:' + email + '\n'
                    + '【お問い合わせ内容】\n' + description
            }
            const adress = 'https://hooks.slack.com/services/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'

            fetch(adress, {
                method: 'POST',
                body: JSON.stringify(payload)
            }).then((response) => {
                alert('送信が完了しました。追ってご連絡いたします!!')
                setDescription("")
                setEmail("")
                setName("")
            }).catch(() => {
                alert('送信に失敗しました。通信環境を整えて再度お試しください！')
            })
        }
    }
    return (
        <div className="form">
            <form action="http://www2.tba.t-com.ne.jp/cgi-bin/form.cgi" method="post" name="mail_form">
            <div className="user__info">
                <input
                value={name}
                onChange={(e) => inputName(e)}
                type='text'
                placeholder="お名前"
                />
                <input
                value={email}
                onChange={(e) => inputEmail(e)}
                type='email'
                placeholder="メールアドレス"
                />
            </div>
            <div className="description">
                <textarea
                    value={description}
                    onChange={(e) => inputDescription(e)}
                    type="text"
                    placeholder="お問い合わせ内容"
                    rows={4}
                />
            </div>
            <input type="hidden" name="tomail" value="s22ah261@seinan-gakuin.jp"/>
            <div className="post">
                <Button
                onClick={submitForm}
                className={classes.button}
                >
                    送信
                </Button> 
            </div>
            </form>
        </div>
    )
}

export default Contact
