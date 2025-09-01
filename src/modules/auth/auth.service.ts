```typescript
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      status: 'success',
      message: 'User registered successfully',
      userId: newUser.id, // Return the userId
    };
  }
}

```