const { response } = require("express");


module.exports = {
    checkIp: (req, res, next) => {
        const ip = [`212.17.162.161`, `212.17.162.163`]// getIP();
        try {
            fetch('https://api.ipify.org?format=json')
            .then((response) => response.json())
            .then(data => {
                console.log('User IP Address:', data.ip, ip, ip.includes(data.ip));  
                if (!ip.includes(data.ip)) {
                    return res.status(403).json({
                        success: false,
                        message: "Forbidden",
                    });
                } else {
                next();
                }
            })
          } catch (error) {
            console.error('Error fetching IP:', error);
          }
    }
}

