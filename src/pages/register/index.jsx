import styles from './register.module.css'
import treeOfLife from '../../assets/treeOfLife.png'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { EyeClosedIcon, Eye, AlertCircle } from 'lucide-react'


export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isValid, errors }
	} = useForm()
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [confirmPasswordError, showConfirmPasswordError] = useState("")
	const [containSpecial, setContainSpecial] = useState(false)
	const [containUpper, setContainUpper] = useState(false)
	const [containNumber, setContainNumber] = useState(false)
	const [isLong, setIsLong] = useState(false)
	const [isPasswordValid, setIsPasswordValid] = useState(true)

	const handleRegister = async (values) => {
		setMessage("")
		setError("")
		if (values.password != confirmPassword){
			showConfirmPasswordError("As senhas devem ser iguais!")
			return
		}

		if (values.name === '' || values.email === '' || values.password === '') {
			setMessage("Email, Nome ou senha inválidos, tente novamente.")
			setError(true)
			return
		}

		const response = await fetch('http://192.168.0.102:5123/createAccount', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ "name": values.name, "email": values.email, "password": values.password })
		})
		const data = await response.json()
		if (data.status === 200) {
			setMessage(data.success)
		} else {
			setMessage(data.error)
			setError(true)
		}
	}

	const verifyPassword = (value) => {
    const formatSpecial = /[^a-zA-Z0-9]/;
    const formatNumber = /[0-9]/;
    const formatUpper = /[A-Z]/;

    const hasSpecial = formatSpecial.test(value);
    const hasNumber = formatNumber.test(value);
    const hasUpper = formatUpper.test(value);
    const isLongEnough = value.length >= 8;

    setContainSpecial(hasSpecial);
    setContainNumber(hasNumber);
    setContainUpper(hasUpper);
    setIsLong(isLongEnough);

    setIsPasswordValid(hasNumber && hasSpecial && hasUpper && isLongEnough);
};

	return (
		<main>
			<img src={treeOfLife} alt="the tree of life" className={styles.imgLoginPage} />
			<div className={styles.formContent}>
				<form className={styles.loginForm} onSubmit={handleSubmit(handleRegister)} >
					<h1 className={styles.loginHeader}>Junte-se a Nós!</h1>
					<span className={styles.redirectloginText}>Já possui uma conta?
						<a className={styles.goTologinPage}> Fazer Login!</a>
					</span>
					<div className={styles.nameDiv}>
						<label htmlFor="name" className={styles.labelName}>Seu Nome:</label>
						<input
							type="text"
							id="name"
							className={errors.name || error ? styles.nameError : styles.name}
							placeholder="Insira seu nome"
							{...register("name", { required: "Campo Obrigatório!" })}
						/>
						{errors.name && (
							<span className={styles.errorText}> <AlertCircle color='red' size={22} /> {errors.name.message}</span>
						)}
					</div>
					<div className={styles.inputDiv}>
						<label htmlFor="email" className={styles.labelEmail}>Email:</label>
						<input
							type="text"
							id="email"
							className={errors.email || error ? styles.emailError : styles.email}
							placeholder="Insira o seu email"
							{...register("email", { required: "Campo Obrigatório" })} />
						{errors.email && (
							<span className={styles.errorText}> <AlertCircle color='red' size={22} /> {errors.email.message}</span>
						)}
					</div>
					<div className={styles.passwordDiv}>
						<label htmlFor="password" className={styles.labelPassword}>Senha:</label>
						<div className={errors.password || error || confirmPasswordError ? styles.passwordErrorDiv : styles.divPasswordButton}>
							<input
								type={!showPassword ? "password" : "text"}
								id="password"
								className={styles.password}
								placeholder="Insira a sua senha"
								{...register("password", { required: "Campo Obrigatório" })}
								onChange={(event) => verifyPassword(event.target.value)}
							/>
							<button className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)} type='button'>
								{showPassword ? (
									<Eye />
								) : (
									<EyeClosedIcon />
								)}
							</button>
						</div>
						<ul className={styles.passwordValidation}> A senha deve conter:
							<li style={containSpecial === true ? {color: 'green'} : {color: 'red'}}>Pelo menos um símbolo</li>
							<li style={containUpper === true ? {color: 'green'} : {color: 'red'}}>Uma letra maiúscula</li>
							<li style={containNumber === true ? {color: 'green'} : {color: 'red'}}>Pelo menos um número</li>
							<li style={isLong === true ? {color: 'green'} : {color: 'red'}}>No mínimo 8 caracteres</li>
						</ul>
						{errors.password && (
							<span className={styles.errorText}> <AlertCircle color='red' size={22} /> {errors.password.message}</span>
						)}
					</div>
					<div className={styles.confirmPasswordDiv}>
						<label htmlFor="confirmPassword" className={styles.labelPassword}>Confirme sua senha:</label>
						<div className={errors.password || error || confirmPasswordError ? styles.passwordErrorDiv : styles.divPasswordButton}>
							<input
								type={!showConfirmPassword ? "password" : "text"}
								id="confirmPassword"
								className={styles.password}
								placeholder="Confirme a senha"
								onChange={(event) => setConfirmPassword(event.target.value)}
							/>
							<button className={styles.eyeButton} onClick={() => setShowConfirmPassword(!showConfirmPassword)} type='button'>
								{showConfirmPassword ? (
									<Eye />
								) : (
									<EyeClosedIcon />
								)}
							</button>
						</div>
						{confirmPasswordError !== "" && (
							<span className={styles.errorText}> <AlertCircle color='red' size={22} /> {confirmPasswordError}</span>
						)}
					</div>
					<button
						type="submit"
						className={styles.submitButton}
						disabled={
							!isValid ||
							isSubmitting ||
							!isPasswordValid
						}
					>
						Criar Conta
					</button>
					<div className={
						message ? (
							error ? (
								styles.messageDivError
							) : (
								styles.messageDivSuccess
							)
						) : (
							styles.messageDiv
						)}
					>
						{message && (
							error ? (
								<span className={styles.errorMessage}> <AlertCircle color='red' size={22} /> {message}</span>
							) : (
								<span className={styles.successMessage}> <AlertCircle color='green' size={22} /> {message}</span>
							)
						)}
					</div>
				</form>
			</div>
		</main>
	)
}