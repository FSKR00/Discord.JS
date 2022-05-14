// 각종 모듈 
const Discord = require("discord.js");
const client = new Discord.Client();
const {prefix, token} = require('./config.json')
const fs = require('fs');
const { MessageButton } = require("discord-buttons");

require('discord-buttons')(client)

// commands 활용을 위한 코드 
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name,command)
}

// 봇의 시작 상태 설정을 위한 코드
client.on("ready", async() => {
    console.log(`${client.user.tag} LOGIN & START`);

    setInterval(() => {
        const statues = [
            `상태메세지 1`, // 상태메세지 입력란
        ]

        const status = statues[Math.floor(Math.random() * statues.length)]
        client.user.setActivity(status, {type: "PLAYING"})

    }, 3000)

});

// 메시지를 만약 dm 으로 보냈다면, 반응 하지 않도록 하는 코드 겸 접두사가 붙어있다면 반응 하도록 설정된 코드
client.on('message',msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot || msg.channel.type === "dm") return
    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName)
    try{
        command.execute(msg,args)
    }catch(error){
        console.log(error)
    }
})

// 디스코드 버튼 기능사용을 위한 코ㄷ

client.on('clickButton', async(button) => {
    // 인증시스템
    if(button.id === 'role_button') {
        const member = button.clicker.member
        let guild = button.guild.name
        const role = button.guild.roles.cache.get("924639584959201280") // 역할 아이디
        await button.channel.bulkDelete(2)
        await member.roles.add(role)
        button.channel.send(`**${button.clicker.member} 님, ${guild} 서버의 인증이 정상적으로 진행되었습니다.**`)
    }
    
    button.defer();
})

// 위 모든 코드를 봇에서  구동?하게 하는 코드
client.login(token);


