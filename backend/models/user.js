import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
  type: String,
  required: [true, 'Email is required'],
  unique: true,
  lowercase: true,
  match: [
    /^[a-zA-Z0-9._%+-]+@my\.sliit\.lk$/,
    'Only SLIIT university emails (@my.sliit.lk) are allowed'
  ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'coach', 'admin'],
    default: 'student'
  },
  phone: {
    type: String,
    trim: true
  },
 
  profileImage: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
 
  // Coach specific fields
  coachId: {
    type: String,
    required: function() {
      return this.role === 'coach';
    },
    unique: true,
    sparse: true // Allows null values but ensures uniqueness when present
  },
  sportName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: function() {
      return this.role === 'coach';
    }
  },
  hireDate: {
    type: Date,
    required: function() {
      return this.role === 'coach';
    }
  },
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'admin'],
    default: 'read'
  }],
  salary: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ employeeId: 1 });
userSchema.index({ department: 1 });
userSchema.index({ isActive: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
  virtuals: true
});

const user = mongoose.model('user', userSchema);
export default user