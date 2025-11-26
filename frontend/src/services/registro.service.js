const registrationService = {
    doRegister: async (newUser) => {
      console.log(newUser, "Hola")
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
        
        if (!response.ok) {
          throw new Error('Error en la solicitud de registro');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
      }
    },
  };
  
  export default registrationService;
  