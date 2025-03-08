from pydantic import BaseModel, EmailStr


class Account(BaseModel):
    name: str
    email: EmailStr
    password: str
