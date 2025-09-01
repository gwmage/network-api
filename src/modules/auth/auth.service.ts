```typescript
    // 4. Create a new user entity and save it
    const newUser = this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });



    return {
      status: 'success',
      message: 'User registered successfully',
      user: newUser,
    };
  }
}

```