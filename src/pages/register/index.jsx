import styles from './register.module.css'
import treeOfLife from '../../assets/treeOfLife.png'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { EyeClosedIcon, Eye } from 'lucide-react'


export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { isSubmitting, isValid, errors }
	} = useForm()
	const [showPassword, setShowPassword] = useState(false)
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")

	const handleRegister = async (values) => {
		throw Error
	}

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
							className={styles.name}
							placeholder="Insira seu nome"
							{...register("name", { required: "Campo Obrigatório" })}
						/>
					</div>
					<div className={styles.inputDiv}>
						<label htmlFor="email" className={styles.labelEmail}>Email:</label>
						<input
							type="email"
							id="email"
							className={styles.email}
							placeholder="Insira o seu email"
							{...register("email", { required: "Campo Obrigatório" })} />
					</div>
					<div className={styles.passwordDiv}>
						<label htmlFor="password" className={styles.labelPassword}>Senha:</label>
						<div className={styles.divPasswordButton}>
							<input
								type={!showPassword ? "password" : "text"}
								id="password"
								className={styles.password}
								placeholder="Insira a sua senha"
								{...register("password", { required: "Campo Obrigatório" })}
							/>
							<div className={styles.eyeDiv} onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<Eye />
								) : (
									<EyeClosedIcon />
								)}
							</div>
						</div>
					</div>
					<button
						type="submit"
						className={styles.submitButton}
						disabled={
							!isValid ||
							isSubmitting}>
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
								<span className={styles.errorMessage}>{message}</span>
							) : (
								<span className={styles.successMessage}>{message}</span>
							)
						)}
					</div>
				</form>
			</div>
		</main>
	)
}