```typescript
async adminLogin(adminLoginDto: AdminLoginDto) {
    const { email, password } = adminLoginDto;
    const admin = await this.usersRepository.findOneBy({ email });

    if (!admin || !admin.isAdmin) {
      throw new UnauthorizedException('Invalid admin credentials.');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid admin credentials.');
    }

    const payload = { email: admin.email, sub: admin.id, isAdmin: admin.isAdmin };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
```