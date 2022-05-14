// 모듈

const { MessageButton } = require("discord-buttons");
const Discord = require('discord.js')

module.exports = {
    name: '인증', // 접두사 다음에 올 명령어
    description: '인증하기', 

    async execute(message){
        if(message.guild.id != "924256050557886524") return; // 서버 아이디
        if(message.channel.id != "924256050557886527") return; // 인증명령어를 입력할 채널 id

        let button = new MessageButton()
        .setStyle('green')
        .setLabel('인증')
        .setID('role_button')

        const embed = new Discord.MessageEmbed()
        .setTitle('OvO System')
        .setColor('#1867b2')
        .setDescription("인증을 진행하기 위해서 아래 버튼을 눌러주세요.")

        message.reply("", {
            button: [button],
            embed: embed
        })
        
    }
}