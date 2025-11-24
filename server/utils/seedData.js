const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');

const sampleGames = [
  {
    title: "Grand Theft Auto VI",
    release_date: "2025-03-15",
    platforms: ["PlayStation 5", "Xbox Series X", "PC"],
    genre: "Action-Adventure",
    description: "The next installment in the legendary GTA series",
    specifications: {
      min_ram: "16GB",
      storage: "150GB",
      graphics: "RTX 3060 or equivalent"
    }
  },
  {
    title: "The Elder Scrolls VI",
    release_date: "2026-11-11",
    platforms: ["PlayStation 5", "Xbox Series X", "PC"],
    genre: "RPG",
    description: "The highly anticipated next chapter in The Elder Scrolls saga",
    specifications: {
      min_ram: "16GB",
      storage: "120GB",
      graphics: "RTX 4070 or equivalent"
    }
  },
  {
    title: "Hollow Knight: Silksong",
    release_date: "2025-06-12",
    platforms: ["Nintendo Switch", "PlayStation 5", "Xbox Series X", "PC"],
    genre: "Metroidvania",
    description: "The sequel to the beloved Hollow Knight",
    specifications: {
      min_ram: "8GB",
      storage: "10GB",
      graphics: "GTX 1050 or equivalent"
    }
  },
  {
    title: "Final Fantasy VII Rebirth",
    release_date: "2025-02-29",
    platforms: ["PlayStation 5"],
    genre: "RPG",
    description: "The second part of the Final Fantasy VII Remake trilogy",
    specifications: {
      min_ram: "16GB",
      storage: "100GB",
      graphics: "Exclusive to PS5"
    }
  },
  {
    title: "Metroid Prime 4",
    release_date: "2025-12-15",
    platforms: ["Nintendo Switch 2"],
    genre: "Action-Adventure",
    description: "The long-awaited fourth installment in the Metroid Prime series",
    specifications: {
      min_ram: "N/A",
      storage: "32GB",
      graphics: "Nintendo Switch 2 Exclusive"
    }
  }
];

const sampleUsers = [
  {
    username: "VGBAdmin1",
    email: "admin@vgb.com",
    password: "admin123",
    is_admin: true
  },
  {
    username: "GameEnthusiast",
    email: "gamer@example.com",
    password: "gamer123",
    is_admin: false
  },
  {
    username: "ProGamer2025",
    email: "pro@example.com",
    password: "progamer123",
    is_admin: false
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Seed Users
    console.log('👥 Seeding users...');
    for (const user of sampleUsers) {
      const { password, ...userData } = user;
      const password_hash = await bcrypt.hash(password, 10);
      
      const userDoc = await db.collection('users').add({
        ...userData,
        password_hash,
        created_at: new Date().toISOString()
      });
      
      console.log(`✓ Created user: ${userData.username} (${userDoc.id})`);
    }
    
    // Seed Games
    console.log('\n🎮 Seeding games...');
    for (const game of sampleGames) {
      const gameDoc = await db.collection('games').add({
        ...game,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      
      console.log(`✓ Created game: ${game.title} (${gameDoc.id})`);
    }
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Users created: ${sampleUsers.length}`);
    console.log(`   - Games created: ${sampleGames.length}`);
    console.log(`\n🔐 Admin credentials:`);
    console.log(`   Email: admin@vgb.com`);
    console.log(`   Password: admin123`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };