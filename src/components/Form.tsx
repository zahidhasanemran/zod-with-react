/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { z } from 'zod'


const userSchema = z.object({
  name: z.string()
         .min(3, { message: 'Name must be at least 3 characters long' })
         .max(15, { message: 'Name must be at most 15 characters long' }),
  email: z.string().email({ message: 'Invalid email format' }),
});


const Form = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',

  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const validatedUser = userSchema.parse(user);
      console.log('Form data is valid:', validatedUser);
      setErrors({
        name: '',
        email: '',
      }); 
    } catch (error:any) {
      console.error('Form data is invalid:', error.errors);
      setErrors(error.errors.reduce((acc:any, err:any) => ({ ...acc, [err.path[0]]: err.message }), {}));
    }
    
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: '',
    });
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '5px' }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: '500px', margin: '20px 0px', padding: '30px', textAlign: 'left' }}>
        <h2>My Form</h2>
        <div style={{ marginBottom: '20px' , marginTop: '30px'}}>
          <label htmlFor="name">Name:</label>
          <input type="text" value={user.name} onChange={handleChange} name="name" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email">Email:</label>
          <input type="email" value={user.email} onChange={handleChange} name="email" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        
        <button type="submit" style={{ padding: '10px 20px', marginBottom: '30px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      </form>
    </div>
  );
};

export default Form;
